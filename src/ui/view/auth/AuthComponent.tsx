import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { AuthViewModel } from '../../view-model/auth/AuthViewModel';

export const AuthComponent = ({
  model,
}: {
  model: AuthViewModel;
}): JSX.Element => {
  const COMPONENT_ID = `AuthComponent`;
  const intl = useIntl();
  const {
    login,
    password,
    onUserChanged,
    onPasswordChanged,
    onClickLogin,
    authError,
  } = model;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case `${COMPONENT_ID}-user-input`:
        onUserChanged(event.target.value);
        break;
      case `${COMPONENT_ID}-password-input`:
        onPasswordChanged(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Typography sx={{ m: 2 }} variant='h3'>
        {intl.formatMessage({ id: `auth.title` })}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        component='form'
        noValidate
      >
        <TextField
          sx={{ m: 1 }}
          id={`${COMPONENT_ID}-user-input`}
          label={intl.formatMessage({ id: `auth.user` })}
          value={login}
          onChange={handleChange}
          autoComplete='username'
        />
        <TextField
          sx={{ m: 1 }}
          id={`${COMPONENT_ID}-password-input`}
          label={intl.formatMessage({ id: `auth.password` })}
          value={password}
          onChange={handleChange}
          type='password'
          autoComplete='current-password'
        />
        <Button
          sx={{ m: 1 }}
          id={`${COMPONENT_ID}-login-button`}
          onClick={onClickLogin}
        >
          {intl.formatMessage({ id: `auth.login` })}
        </Button>
      </Box>

      {authError && (
        <Typography
          sx={{ m: 2 }}
          id={`${COMPONENT_ID}-error-info`}
          variant='h6'
          color='error'
        >
          {intl.formatMessage({ id: `auth.error.${authError}` })}
        </Typography>
      )}
    </Box>
  );
};
