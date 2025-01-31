import React,{useState} from "react";
import Button from './Button';

interface FormProps {
    setContador: React.Dispatch<React.SetStateAction<number>>;
    contador: number;
}
 

const Form: React.FC<FormProps> = ({ setContador, contador }) => {
    const [nombre,setNombre]= useState("");
    const [nombreListo,setNombreListo]=useState("");
    const handleSubmit=(event:React.FormEvent)=>{
        event.preventDefault();
        setNombreListo (nombre);
        setNombre("");
    };

    return(
    <div>
    <form onSubmit={handleSubmit}>
        <input type="text" id="nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} placeholder="ingresa tu nombre"/>
        <Button text="Enviar" onClick={()=> setContador(contador+1)} color="blue"/>
        <Button text="Enviar" onClick={()=> setContador(contador+5)} color="red"/>
        <Button text="Enviar" onClick={()=> setContador(contador+13)} color="black"/>
        <Button text="Enviar" onClick={()=> setContador(contador-5)} color="black"/>


    </form> 
      {nombreListo && <h2>Bienvenido {nombreListo}!</h2>}
      </div>
    );

};

export default Form;
