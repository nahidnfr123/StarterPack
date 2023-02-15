import {createContext, useState, useMemo} from "react";
import {createTheme} from "@mui/material";

export const tokens = (mode) => ({
  ...(mode === 'dark' ? {
    primary: {
      100: '#1254d7'
    }
  } : {
    primary: {
      100: '#1254d7'
    }
  })
})


export const themeSettings = (mode) => {
  const colors = tokens(mode)

  return {
    palette: {
      mode: mode,
      ...(mode === 'dark' ? {
        primary: {
          main: colors.primary[100]
        }
      } : {
        primary: {
          main: colors.primary[100]
        }
      })
    }
  }
}
