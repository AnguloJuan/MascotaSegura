// This file will be deleted once context is implemented in the app
'use client'
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const anonUser = {
  id: 0,
  idTipoUsuario: 0,
};

export async function GetUser() {
  const { user } = useContext(AuthContext);
  return user;
}
