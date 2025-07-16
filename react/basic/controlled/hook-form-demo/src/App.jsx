import { useState } from 'react'
import { useForm } from "react-hook-form";

import './App.css'

function HookForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <input type="submit" />
    </form>
  );
}

function App() {
 
  return (
    <>
      <HookForm/>
    </>
  )
}

export default App
