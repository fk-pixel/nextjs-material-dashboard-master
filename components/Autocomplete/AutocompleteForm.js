// nodejs library to set properties for components
import { Autocomplete, TextField } from "@mui/material";
import _ from "lodash";
import React from "react";

export default function AutocompleteForm(props) {
  const {
    autoHighlight,
    disableClearable,
    options,
    freeSolo,
    getOptionLabel,
    multiple,
    label,
    ...params
  } = props;

  const getValue = React.useCallback(() => {
    if (params.name) return params[params.name];

    if (multiple) return [];

    return null;
  }, [params.name, multiple]);

  const [value, setValue] = React.useState(getValue);
  //   const [open, setOpen] = React.useState(true);

  //   const apiRef = useGridApiContext();

  const changeHandler = (name) => (evt, newValue, action, option) => {
    // Also as you are updating/adding to state a callback should be used in setFields
    setFields((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleChange = React.useCallback(
    (event, newValue) => {
      // event.stopPropagation();
      setValue({
        //id: params.id,
        value: newValue?.label !== undefined ? newValue.label : newValue,
      });

      //   if (params.name !== undefined) {
      //     _.set(params, params.name, newValue);
      //   }
    },
    [value]
  );

  const handleInputChange = (e, data) => {
    return data;
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      // onChange={() => changeHandler(name)}
      onInputChange={(event, value) =>
        freeSolo && !multiple && event && handleInputChange(event, value)
      }
      //   open={open}
      //   onOpen={() => setOpen(true)}
      //   onClose={() => setOpen(false)}
      fullWidth
      //   sx={{
      //     "&.MuiAutocomplete-endAdornment": {
      //       top: 0,
      //     },
      //   }}

      multiple={multiple}
      options={options ?? []}
      freeSolo={freeSolo}
      autoHighlight={autoHighlight}
      autoSelect={true}
      getOptionLabel={getOptionLabel}
      disableClearable={disableClearable}
      renderInput={(inputParams) => (
        <TextField
          {...inputParams}
          label={label}
          fullWidth
          error={params.error}
        />
      )}
    />
  );
}
