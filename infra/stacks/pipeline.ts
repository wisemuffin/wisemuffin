import * as CDK from "@aws-cdk/core";
import * as CodeBuild from "@aws-cdk/aws-codebuild";
import * as S3 from "@aws-cdk/aws-s3";
import * as CodePipeline from "@aws-cdk/aws-codepipeline";
import * as CodePipelineAction from "@aws-cdk/aws-codepipeline-actions";
import * as ssm from "@aws-cdk/aws-ssm";
import * as route53 from "@aws-cdk/aws-route53";
import * as route53targets from "@aws-cdk/aws-route53-targets";
import * as iam from "@aws-cdk/aws-iam";

export interface PipelineProps extends CDK.StackProps {
  github: {
    owner: string;
    repository: string;
  };
  route53: {
    recordName: string;
    domainName: string;
  };
}

export class Pipeline extends CDK.Stack {
  constructor(scope: CDK.App, id: string, props: PipelineProps) {
    super(scope, id, props);

    // Amazon S3 bucket to store CRA website
    const bucketWebsite = new S3.Bucket(this, "Files", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      bucketName: props.route53.domainName,
    });

    // route53
    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName: props.route53.domainName,
    });

    new route53.ARecord(this, "AliasRecord", {
      zone,
      recordName: props.route53.domainName,
      target: route53.RecordTarget.fromAlias(
        new route53targets.BucketWebsiteTarget(bucketWebsite)
      ),
    });

    // AWS CodeBuild artifacts
    const outputSources = new CodePipeline.Artifact();
    const outputWebsite = new CodePipeline.Artifact();

    // AWS CodePipeline pipeline
    const pipeline = new CodePipeline.Pipeline(this, "Pipeline", {
      restartExecutionOnUpdate: true,
    });

    // AWS CodePipeline stage to clone sources from GitHub repository
    pipeline.addStage({
      stageName: "Source",
      actions: [
        new CodePipelineAction.GitHubSourceAction({
          actionName: "Checkout",
          owner: props.github.owner,
          repo: props.github.repository,
          oauthToken: CDK.SecretValue.secretsManager("awsCDKGitHubToken"),
          output: outputSources,
          trigger: CodePipelineAction.GitHubTrigger.WEBHOOK,
        }),
      ],
    });

    // AWS CodeBuild to build CRA website and CDK resources
    const codeBuildStage = new CodeBuild.PipelineProject(
      this,
      "BuildWebsiteWisemuffinTemp",
      {
        environmentVariables: {
          REACT_APP_YAHOOFINANCE: {
            type: CodeBuild.BuildEnvironmentVariableType.PARAMETER_STORE,
            value: "REACT_APP_YAHOOFINANCE",
          },
          REACT_APP_MAPBOX_TOKEN: {
            type: CodeBuild.BuildEnvironmentVariableType.PARAMETER_STORE,
            value: "REACT_APP_MAPBOX_TOKEN",
          },
          REACT_APP_ENV: {
            type: CodeBuild.BuildEnvironmentVariableType.PARAMETER_STORE,
            value: "WISEMUFFIN_REACT_APP_ENV",
          },
          REACT_APP_GRAHQL_PROD: {
            type: CodeBuild.BuildEnvironmentVariableType.PARAMETER_STORE,
            value: "WISEMUFFIN_REACT_APP_GRAHQL_PROD",
          },
          REACT_APP_OKTA_CLIENT_ID: {
            type: CodeBuild.BuildEnvironmentVariableType.PARAMETER_STORE,
            value: "WISEMUFFIN_REACT_APP_OKTA_CLIENT_ID",
          },
          REACT_APP_OKTA_DOMAIN: {
            type: CodeBuild.BuildEnvironmentVariableType.PARAMETER_STORE,
            value: "WISEMUFFIN_REACT_APP_OKTA_DOMAIN",
          },
          REACT_APP_OKTA_CALLBACK: {
            type: CodeBuild.BuildEnvironmentVariableType.PARAMETER_STORE,
            value: "WISEMUFFIN_REACT_APP_OKTA_CALLBACK",
          },
          REACT_APP_HOST: {
            type: CodeBuild.BuildEnvironmentVariableType.PARAMETER_STORE,
            value: "WISEMUFFIN_REACT_APP_HOST",
          },
        },
        projectName: "Websitetemp",
        buildSpec: CodeBuild.BuildSpec.fromSourceFilename(
          "./infra/buildspec.yml"
        ),
        environment: { computeType: CodeBuild.ComputeType.MEDIUM },
      }
    );

    // Grant code build paramter store access
    codeBuildStage.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ssm:GetParameters", "ssm:GetParameter"],
        resources: [
          `arn:aws:ssm:${CDK.Stack.of(this).region}:${
            CDK.Stack.of(this).account
          }:parameter/REACT_APP_YAHOOFINANCE`,
          `arn:aws:ssm:${CDK.Stack.of(this).region}:${
            CDK.Stack.of(this).account
          }:parameter/REACT_APP_MAPBOX_TOKEN`,
        ],
        effect: iam.Effect.ALLOW,
      })
    );

    // AWS CodePipeline stage to build CRA website and CDK resources
    pipeline.addStage({
      stageName: "Build",
      actions: [
        // AWS CodePipeline action to run CodeBuild project
        new CodePipelineAction.CodeBuildAction({
          actionName: "Build",
          project: codeBuildStage,
          input: outputSources,
          outputs: [outputWebsite],
        }),
      ],
    });

    // AWS CodePipeline stage to deployt CRA website and CDK resources
    pipeline.addStage({
      stageName: "Deploy",
      actions: [
        // AWS CodePipeline action to deploy CRA website to S3
        new CodePipelineAction.S3DeployAction({
          actionName: "Website",
          input: outputWebsite,
          bucket: bucketWebsite,
        }),
      ],
    });

    new CDK.CfnOutput(this, "WebsiteURL", {
      value: bucketWebsite.bucketWebsiteUrl,
      description: "Website URL",
    });
  }
}
