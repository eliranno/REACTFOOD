import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import { useEffect, useState, useContext } from "react";

function Meals() {
    const {data: loadedMeals, isLoading, isError } = useHttp('http://localhost:3000/meals', {});

    return (
        <ul id='meals'>
            {
                loadedMeals.map(meal=>(
                    <MealItem key={meal.id} meal={meal}/>
                ))
            }
        </ul>
    );
}

export default Meals;