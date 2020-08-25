import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useOktaAuth } from "@okta/okta-react";
import {
  Button,
  CssBaseline,
  InputLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";
import {
  CellProps,
  FilterProps,
  FilterValue,
  IdType,
  Row,
  TableInstance,
} from "react-table";

import { Table } from "./Tables/ReactTable/Components/Table";
import { PersonData, makePersonData } from "../util";
import { getGameScores2_getGameScores } from "../graphql/generated/getGameScores2";

const PLAYER = gql`
  query getGameScores2 {
    getGameScores(game: "uno") {
      ID
      name
      score
      game
      playerID
    }
  }
`;

const DELETE_PLAYER = gql`
  mutation deletePlayer2($ID: String!) {
    deletePlayerScore(ID: $ID) {
      name
    }
  }
`;

const ADD_PLAYER = gql`
  mutation player(
    $ID: String!
    $name: String!
    $score: Int!
    $game: String!
    $playerID: String!
  ) {
    createPlayerScore(
      player: {
        ID: $ID
        name: $name
        score: $score
        game: $game
        playerID: $playerID
      }
    ) {
      ID
      name
      score
      game
      playerID
    }
  }
`;

// This is a custom aggregator that
// takes in an array of values and
// returns the rounded median
function roundedMedian(values: any[]) {
  let min = values[0] || "";
  let max = values[0] || "";

  values.forEach((value) => {
    min = Math.min(min, value);
    max = Math.max(max, value);
  });

  return Math.round((min + max) / 2);
}

function filterGreaterThan(
  rows: Array<Row<any>>,
  id: Array<IdType<any>>,
  filterValue: FilterValue
) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== "number";

function SelectColumnFilter({
  column: { filterValue, render, setFilter, preFilteredRows, id },
}: FilterProps<getGameScores2_getGameScores>) {
  const options = React.useMemo(() => {
    const options = new Set<any>();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...Array.from(options.values())];
  }, [id, preFilteredRows]);

  return (
    <TextField
      select
      label={render("Header")}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <MenuItem value={""}>All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}

const getMinMax = (
  rows: Row<getGameScores2_getGameScores>[],
  id: IdType<getGameScores2_getGameScores>
) => {
  let min = rows.length ? rows[0].values[id] : 0;
  let max = rows.length ? rows[0].values[id] : 0;
  rows.forEach((row) => {
    min = Math.min(row.values[id], min);
    max = Math.max(row.values[id], max);
  });
  return [min, max];
};

function SliderColumnFilter({
  column: { render, filterValue, setFilter, preFilteredRows, id },
}: FilterProps<getGameScores2_getGameScores>) {
  const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [
    id,
    preFilteredRows,
  ]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <TextField
        name={id}
        label={render("Header")}
        type="range"
        inputProps={{
          min,
          max,
        }}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <Button
        variant="outlined"
        style={{ width: 60, height: 36 }}
        onClick={() => setFilter(undefined)}
      >
        Off
      </Button>
    </div>
  );
}

const useActiveElement = () => {
  const [active, setActive] = React.useState(document.activeElement);

  const handleFocusIn = () => {
    setActive(document.activeElement);
  };

  React.useEffect(() => {
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  return active;
};

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], render, preFilteredRows, setFilter, id },
}: FilterProps<getGameScores2_getGameScores>) {
  const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [
    id,
    preFilteredRows,
  ]);
  const focusedElement = useActiveElement();
  const hasFocus =
    focusedElement &&
    (focusedElement.id === `${id}_1` || focusedElement.id === `${id}_2`);
  return (
    <>
      <InputLabel htmlFor={id} shrink focused={!!hasFocus}>
        {render("Header")}
      </InputLabel>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingTop: 5,
        }}
      >
        <TextField
          id={`${id}_1`}
          value={filterValue[0] || ""}
          type="number"
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old: any[] = []) => [
              val ? parseInt(val, 10) : undefined,
              old[1],
            ]);
          }}
          placeholder={`Min (${min})`}
          style={{
            width: "70px",
            marginRight: "0.5rem",
          }}
        />
        to
        <TextField
          id={`${id}_2`}
          value={filterValue[1] || ""}
          type="number"
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old: any[] = []) => [
              old[0],
              val ? parseInt(val, 10) : undefined,
            ]);
          }}
          placeholder={`Max (${max})`}
          style={{
            width: "70px",
            marginLeft: "0.5rem",
          }}
        />
      </div>
    </>
  );
}

const columns = [
  {
    Header: "Player Table",
    columns: [
      {
        Header: "ID",
        accessor: "ID",
        Aggregated: ({
          cell: { value },
        }: CellProps<getGameScores2_getGameScores>) => `${value} Names`,
      },
      {
        Header: "Player Name",
        accessor: "name",
        Aggregated: ({
          cell: { value },
        }: CellProps<getGameScores2_getGameScores>) => `${value} Names`,
      },
      {
        Header: "Score",
        accessor: "score",
        Aggregated: ({
          cell: { value },
        }: CellProps<getGameScores2_getGameScores>) => `${value} Names`,
        Filter: SliderColumnFilter,
        filter: "equals",
      },
      {
        Header: "Game",
        accessor: "game",
        Aggregated: ({
          cell: { value },
        }: CellProps<getGameScores2_getGameScores>) => `${value} Names`,
      },
      // {
      //   Header: "Last Name",
      //   accessor: "lastName",
      //   aggregate: "uniqueCount",
      //   filter: "fuzzyText",
      //   Aggregated: ({ cell: { value } }: CellProps<getGameScores2_getGameScores>) =>
      //     `${value} Unique Names`,
      // },
    ],
  },
];

function PlayerGames2() {
  // const { authState, authService } = useOktaAuth();

  const [deletePlayer, { data: dataDeleted }] = useMutation(DELETE_PLAYER);
  const [addPlayer, { data: dataAdd }] = useMutation(ADD_PLAYER);
  const { loading, error, data } = useQuery(PLAYER, {
    // variables: {},
  });
  const deletePlayerCallback = React.useCallback(
    (instance: TableInstance<getGameScores2_getGameScores>) => (
      e: React.MouseEvent<Element, MouseEvent>
    ) =>
      instance.rows
        .filter((row) => row.isSelected)
        .map((rowToDelete) =>
          deletePlayer({
            variables: { ID: rowToDelete.original.ID },
            refetchQueries: [{ query: PLAYER }],
          })
        ),

    []
  );

  const addPlayerCallback = React.useCallback(
    // (instance: TableInstance<getGameScores2_getGameScores>) =>
    (player: getGameScores2_getGameScores) => {
      console.log("player to add: ", player);
      addPlayer({
        variables: {
          ID: player.ID,
          name: player.name,
          playerID: player.playerID,
          score: player.score && +player.score,
          game: player.game,
        },
        refetchQueries: [{ query: PLAYER }],
      });
    },
    []
  );

  // const dummy = React.useCallback(() => () => null, []);
  const dummy = React.useCallback(
    (instance: TableInstance<getGameScores2_getGameScores>) => (
      e: React.MouseEvent<Element, MouseEvent>
    ) => console.log(instance),
    []
  );

  if (loading || !data)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error :(</p>;

  // const [data] = React.useState<PersonData[]>(() => makePersonData(100));

  return (
    <div>
      {/* {data.getGameScores.map(({ name, score }) => (
        <div key={name}>
          <p>
            {name}: {score}
          </p>
          <button onClick={() => deletePlayer()}>delete</button>
          {JSON.stringify(dataDeleted)}
        </div>
      ))} */}
      <Table<getGameScores2_getGameScores>
        name={"testTable"}
        columns={columns}
        data={data.getGameScores}
        onAddDialog={addPlayerCallback}
        onAdd={dummy}
        onEdit={dummy}
        onDelete={deletePlayerCallback}
      />
    </div>
  );
}
export default PlayerGames2;
