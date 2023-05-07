import React from "react";
import styles from './Card.module.css';
import { Link } from "react-router-dom";

const Card = ({ name, image, diets, id, healthscore }) => {     /* healthscore to check sort */

// return con info similar a la de Detail.jsx
    return (
        <div className={styles.mainContainer}>
            {name ? <h2>{name}</h2> : <h2>No name provided</h2>} 

            {image ? <img src={image}  width="200px" height="200px"/> : <h2>No image provided</h2>} 

            {healthscore ? <p>{`Healthscore: ${healthscore} / 100`}</p> : <h2>No healthscore provided</h2>} {/* healthscore to check sort */}

            {/*<h4>Diets:</h4> */} 
               {
                    diets && diets.length 
                    ? <div>
                        <ul>
                            {
                                diets.map((diet, index) => {
                                    return (<li key={index}>{diet}</li>)
                                })
                            }
                        </ul> 
                    </div>
                    : <p>This recipe does not adhere to any particular dietary restrictions.</p>
                }

            <Link to={`/detail/${id}`}>
                <button>View details</button>
            </Link>

        </div>
    );
};

export default Card;