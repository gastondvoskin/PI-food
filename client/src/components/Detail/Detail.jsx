import React, { useState, useEffect } from "react";
import styles from './Detail.module.css';
import { Link, useNavigate, useParams } from "react-router-dom";
// import { getRecipeDetail } from "../../redux/actions/actionsIndex.js";
import axios from "axios";



const Detail = (props) => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    // INICIO: IMPLEMENTACION CON LOCAL STATE Y ASYNC-AWAIT 
    const [recipeDetail, setRecipeDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // detailRaw es lo que en el back, en getRecipeByIdHandler, llamo recipeById
    useEffect(() => {
        const getRecipeDetail = async () => {
            try {
                const detailRaw = await axios.get(`http://localhost:3001/recipes/${id}`);
                const detailClean = detailRaw.data;
                setRecipeDetail(detailClean); 
            } catch (error) {
                console.log(error.response.data.error);
                navigate('inexistentID');
            };
            setIsLoading(false);
        };
        getRecipeDetail(); 
        // return setRecipeDetail({}); // (unmount, esto no me funciona)
    }, [id]);       // también navigate en array de dependencias? por qué? 
    // FIN IMPLEMENTACION CON LOCAL STATE Y ASYNC-AWAIT

    // In case the Id provided doesn't exist, the local state has a string received from the back-end and before rendering history.push("/inexistentId") generates a navigation ton /inexistenId, which is part of the * path set in App.jsx which renders Error404.jsx component. 
    // It is in a useEffect because nvaigate is async, so other way I would get a render before navigate finishs the execution. 

    const { name, summary, healthscore, steps, image, diets } = recipeDetail;

    return (
        
        isLoading 
        ? (<h2>Loading...</h2>) 
        : (
            <div>
                {/* The name is rendered conditionally. If the name exists, it is displayed inside an h2 tag. If not, a fallback message is displayed. This is a validation step that accounts for the possibility of Spoonacular sending a recipe without a name, or if a constraint in my database doesn't work properly. */}
                {name ? <h2>{name}</h2> : <h2>No name provided</h2>} 

                {image ? <img src={image} alt="recipe image" width="200px" height="200px"/> : <h2>No image provided</h2>} 

                <p>{`Id: ${id}`}</p>

                {healthscore ? <p>{`Healthscore: ${healthscore} / 100`}</p> : <h2>No healthscore provided</h2>} 

                <h4>Summary:</h4>
                <div className={styles.summarycontainer}>
                    {summary ? <p dangerouslySetInnerHTML={{ __html: summary }}></p> : <h2>No summary provided</h2>} 
                </div>
                {/* {summary ? <p>{summary}</p> : <h2>No summary provided</h2>}  */}

                <h4>Steps:</h4>
                {
                    steps && steps.length && steps[0] !== ''
                    ? <div>
                        <ol>
                            {
                                steps.map((step, index) => {
                                    return (<li key={index}>{step}</li>)
                                })
                            }
                        </ol> 
                    </div>
                    : <p>This recipe does not have any steps listed.</p>
                }

                <h4>Diets:</h4>
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


                <Link to={'/home'}>
                    <button>Go back Home</button>
                </Link>

            </div>
        )
        
        
    );
};

export default Detail;






// OLD getRecipeDetail (replaced for local state implementation)
    // // INICIO IMPLEMENTACION CON LOCAL STATE Y PROMISE (.THEN)
    // const [recipeDetail, setRecipeDetail] = useState({});
    // useEffect(() => {
    //     axios.get(`http://localhost:3001/recipes/${id}`)
    //         .then((res) => res.data)
    //         .then((data) => {
    //             setRecipeDetail(data)
    //         });

    //         return setRecipeDetail({});
    // }, [id]);
    // // FIN IMPLEMENTACION CON LOCAL STATE Y PROMISE (.THEN)
    
    // INICIO: IMPLEMENTACION CON REDUX.
    // useEffect(() => {
    //     dispatch(getRecipeDetail(id));
    // }, [dispatch, id]);     // selene puso en array de dependencias dispatch, no sé por qué
    // const recipeDetail = useSelector((state) => state.recipeDetail); 
    // FIN: IMPLEMENTACION CON REDUX.


