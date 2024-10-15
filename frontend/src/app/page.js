"use client"
import Button from "@/components/button";
import Link from "next/navigation";
import { useRouter, router } from "next/router";
import React, { useState, useEffect } from "react";
import { getUsers, fetchRegister } from "@/app/javascript.js";
import Input from "@/components/input"; // Importamos el componente Input
import styles from "@/app/page.module.css"; // Estilos para el formulario
import Header from "@/components/header";

export default function Home() {

  let [name, setName] = useState("");
  let [surname, setSurname] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [mail, setMail] = useState("");  

  
  async function linkLogin() {
    try {
      const users = await getUsers(); // Obtener los usuarios desde el API
      const user = users.find(u => u.username === username); // Buscar usuario por nombre de usuario

      if (user) {
        // Si el usuario existe, verificar la contraseña
        if (user.password === password) {
          window.alert("Login exitoso");
          console.log(user.id);
          window.location.href = `/deportistas`;
          return
        } else {
          window.alert("Contraseña incorrecta");
        }
      } else {
        window.alert("El usuario no existe");
      }
    } catch (error) {
      console.error("Error al intentar hacer login:", error);
      window.alert("Error al iniciar sesión");
    }
  }
  // Función para registrar una nueva cuenta
  async function linkRegister() {
    try {
      const users = await getUsers(); // Obtener los usuarios desde el API
      const userExists = users.some(u => u.username === username); // Verificar si el usuario ya existe
      let image="data:image/png;base64,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"
      if (!userExists) {
        if(name.length<4){
          window.alert("Pone bien tu nombre");
          return
        }if(surname.length<4){
          window.alert("Pone bien tu apellido");
          return
        }if(mail.length<6){
          window.alert("Completa tu mail");
          return
        }if(username.length<4){
          window.alert("Pone un nombre más largo");
          return
        }if(password.length<4){
          window.alert("La contraseña es muy breve");
          return
        }
        // Si el nombre de usuario es único, registrar el nuevo usuario
          const newUser = {
            name,
            surname,
            username,
            password,
            mail,
            image
          };
          console.log(newUser)
              // Llamamos a fetchRegister para registrar el nuevo usuario en el backend
        const result = await fetchRegister(newUser);

        if (result) {
          window.alert("Registro exitoso");
          linkLogin()
        } else {
          window.alert("Error al registrar el usuario");
        }
      } else {
        window.alert("El nombre de usuario ya existe, elige otro");
      }
    } catch (error) {
      console.error("Error al registrar la cuenta:", error);
      window.alert("Error al registrar la cuenta");
    }
  }
  return (
    <div>
    <Header/>
    <main>
      <div className={styles.container}>
      <h2>Login / Sign-Up</h2>
      <Input
          label="Usuario"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Correo Electrónico"
          type="mail"
          name="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <Input
          label="Nombre"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Apellido"
          type="text"
          name="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <Button  onClick={linkLogin}>
          Login
        </Button>
        <Button onClick={linkRegister}>
          Registrarse
        </Button>
      </div>
    </main>
    </div>
  );
}
