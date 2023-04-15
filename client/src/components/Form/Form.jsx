import React from "react";
import styles from './Form.module.css';

const Form = () => {
    return (
        <div>
            NIY: Form. 
            En esta vista se encontrará el formulario para crear una nueva receta.
            Este formulario debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:
            Nombre.
            Resumen del plato.
            Nivel de comida saludable (health score).
            Paso a paso.
            Imagen.
            Posibilidad de seleccionar/agregar varios tipos de dieta en simultáneo.
            Botón para crear la receta.
            [IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre de la receta no pueda contener números, o que el health score no pueda exceder determinado valor, etc.
        </div>
    );
};

export default Form;


/* 📍 FORM PAGE |: en esta vista se encontrará el formulario para crear una nueva receta.

Este formulario debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

Nombre.
Resumen del plato.
Nivel de comida saludable (health score).
Paso a paso.
Imagen.
Posibilidad de seleccionar/agregar varios tipos de dieta en simultáneo.
Botón para crear la receta.
[IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre de la receta no pueda contener números, o que el health score no pueda exceder determinado valor, etc. */