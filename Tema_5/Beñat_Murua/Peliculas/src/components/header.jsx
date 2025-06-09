import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../styles/header.css';

const buttons = [
  <Button key="one">Inicio</Button>,
  <Button key="two">Peliculas</Button>,
  <Button key="three">Contacto</Button>,
  <Button key="four">Sobre nosotros</Button>,
  <Button key="five">Registro</Button>,
];

export const Header=()=> {
  return (
    <div className="header">
      <ButtonGroup size="large" aria-label="Large button group">
        {buttons}
      </ButtonGroup>
    </div>
  );
}