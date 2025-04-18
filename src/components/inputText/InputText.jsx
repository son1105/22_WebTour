import React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
function InputText({ id, label, type, multiline, value, onChange, children, disable, notForm, min, className }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <FormControl className={className} style={{ width: '100%', marginTop: notForm ? 0 : 20 }} variant="standard">
      {label && <InputLabel htmlFor={id} style={{ color: focus ? '' : 'black', fontSize: 18, fontWeight: 500 }}>{label}</InputLabel>}
      {type == "file" ?
        <input
          type="file"
          disabled={disable}
          accept="image/*"
          onChange={(e) => onChange(e)}
        />
        : <Input
          key={id}
          multiline={multiline}
          type={type}
          value={value}
          onChange={(e) => {
            if (min != undefined && e.target.value < min) {
              e.target.value = min
            }
            onChange(e)
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          disabled={disable ? true : false}
          style={{ color: 'black', fontSize: 18 }}
          endAdornment={
            children !== undefined ?
              <InputAdornment position="end" style={{ color: focus ? '#1976D2' : 'black', paddingRight: 12 }}>
                {children}
              </InputAdornment>
              : null
          }
        />}
    </FormControl>
  )
}

export default InputText;
