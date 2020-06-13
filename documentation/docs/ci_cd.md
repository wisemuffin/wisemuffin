---
id: ci_cd
title: Continous Integration & Deployment
sidebar_label: Continous Integration & Deployment
---

# CI / CD Process

- push any branch to github
- circle CI runs jest tests
- if not master then create pull request
- if merged to master then triggers AWS codepipeline
- AWS codepipline then builds master branch from github into S3 bucket and deploys for static website hosting
- testing via lighthouse - performance testing
- events are sent to slack via webhooks

# Slack notification

Codepipeline status => cloudwatch rule => sns topic => lambda => slackwebhook

[guide](https://dev.to/alex_barashkov/how-to-send-aws-cloudwatch-alarms-to-slack-596e)

# Cloud Formation - infrastructure as code for AWS Codepipline

creat stack

```bash
aws cloudformation create-stack --template-body file://./cloudformation-ci-cd.yml --stack-name wisemuffin-ci-cd --parameters ParameterKey=ProjectSource,ParameterValue="https://github.com/wisemuffin/wisemuffin-viz2" ParameterKey=GithubOwner,ParameterValue=wisemuffin ParameterKey=GithubRepo,ParameterValue=wisemuffin-viz2 ParameterKey=GithubOAuthToken,ParameterValue=\$WISEMUFFIN_GITHUB_OAUTH --capabilities CAPABILITY_IAM
```

to redeploy existing stack

```bash
aws cloudformation deploy --template-file file://./cloudformation-ci-cd.yml --stack-name wisemuffin-ci-cd
```

# Testing

Jest - Test runner
Enzyme - Testing utility for React
[Lighhouse CI](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/getting-started.md) - tests performance on the web

CI = circle ci
[setup on circle ci blog](https://circleci.com/blog/continuously-testing-react-applications-with-jest-and-enzyme/)

naming convetion: component.spec.js

## to run jest locaclly

npm test
or npm test:watch

## on each push to git hub

circleCI will run test in the cloud and is linked to github

## lighthouse ci

circle ci will run the tests and push results to temp storage server.
Historical reports and advanced report diffing is available with the Lighthouse CI server.

### The Lighthouse CI Server

checkout out [The Lighthouse CI Server docs](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/getting-started.md)

## end to end test - Cyrpess

```bash
yarn run e2e
```

### Using Graphical User Interfaces like Cypress' in WSL2

[check out this](https://dev.to/nickymeuleman/using-graphical-user-interfaces-like-cypress-in-wsl2-249j)

# Amplify notes

Authentication - As a workaorund for unauthenticated and federated access, i am using AWS_IAM. Instructions from [Nada Dabit](https://github.com/dabit3/appsync-auth-and-unauth) legend!

# create-react-app or react-scripts fork

NOT USING THIS ANY MORE - simply use CRA for production build and my own local webpack dev server set up for development.

As outlined in this [video](https://www.youtube.com/watch?v=I22TW-33dDE) i have forked CRA to customise webpack (to solve issues with breakpoints not hitting in VScode)
When CRA is updated i just need to (when on custom-react-scripts branch):

\$ git rebase upstream/master

[Link](https://webpack.js.org/configuration/devtool/) to source map comparisons for webpack

to use the new script:
npx create-react-app name --scripts-version @wisemuffin/react-scripts

# analyse bundle size

note cant do this on WSL!

```bash
npm run build
npm run analyze
```
