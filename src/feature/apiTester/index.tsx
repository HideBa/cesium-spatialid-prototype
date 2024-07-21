import { Button, Stack, styled, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export type ApiTesterProps = {
  spatialId?: string;
};

const ApiTester = ({ spatialId }: ApiTesterProps) => {
  const [exJson, setExJson] = useState("");
  const [loading, setLoading] = useState(false);

  //send dummy request waiting for 1 sec
  const handleSentRequest = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setExJson(
        JSON.stringify(
          {
            buildingId: "BLD-12345",
            name: "Skyline Tower",
            type: "Commercial",
            yearBuilt: 2015,
            address: {
              street: "123 Main Street",
              city: "Metropolis",
              state: "NY",
              zipCode: "10001",
              country: "United States",
            },
            geolocation: {
              latitude: 40.7128,
              longitude: -74.006,
            },
          },
          null,
          2
        )
      );
    }, 1000);
    setLoading(false);
  }, []);

  return (
    <StyledStack>
      <Button onClick={handleSentRequest} disabled={loading}>
        {loading ? "Loading..." : "Send Reques"}
      </Button>
      {spatialId && <Typography>{"Spatial ID: " + spatialId}</Typography>}
      {exJson && (
        <SyntaxHighlighter language="json" style={atomDark}>
          {exJson}
        </SyntaxHighlighter>
      )}
    </StyledStack>
  );
};

const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Use theme for consistent styling
  padding: 20,
  margin: 20,
  borderRadius: 8,
}));

export default ApiTester;
