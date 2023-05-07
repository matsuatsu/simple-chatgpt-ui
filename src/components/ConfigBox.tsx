import { useState } from "react";
import { Box, Card, CardContent, TextField, MenuItem } from "@mui/material";
import { useOpenaiConfigStore } from "../stores/openaiConfig";
import { ModelOptions, OpenaiConfigInterface } from "../types/openaiConfig";
import { grey } from "@mui/material/colors";

const ConfigBox = () => {
  const openaiConfig = useOpenaiConfigStore((state) => state.openaiConfig);
  const setOpenaiConfig = useOpenaiConfigStore(
    (state) => state.setOpenaiConfig
  );

  const updateModel = (_model: string) => {
    const newConfig: OpenaiConfigInterface = {
      ...openaiConfig,
      model: _model as ModelOptions,
    };
    setOpenaiConfig(newConfig);
  };

  const updateApiKey = (_apiKey: string) => {
    const newConfig: OpenaiConfigInterface = {
      ...openaiConfig,
      apiKey: _apiKey,
    };
    setOpenaiConfig(newConfig);
  };

  return (
    <Box
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={grey[300]}
    >
      <Card sx={{ width: "80%" }}>
        <CardContent>
          <TextField
            fullWidth
            value={openaiConfig.model}
            onChange={(e) => updateModel(e.target.value)}
            select
            label="Model"
          >
            <MenuItem value={"gpt-3.5-turbo"}>gpt-3.5-turbo</MenuItem>
            <MenuItem value={"echo"}>echo</MenuItem>
          </TextField>
        </CardContent>
        {openaiConfig.model != "echo" && (
          <CardContent>
            <TextField
              label={"API key"}
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              value={openaiConfig.apiKey}
              onChange={(e) => {
                updateApiKey(e.target.value);
              }}
              fullWidth
            />
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default ConfigBox;
