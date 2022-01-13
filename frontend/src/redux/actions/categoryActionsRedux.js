import axios from 'axios'

const categoryActionsRedux = {

    getAllCategories : () =>{
        return async (dispatch)=>{
            let response = await axios.get("http://localhost:4000/api/allcategories")
            dispatch({type: "GET_ALL_CATEGORIES", payload:response.data.response})
        }
    },
    getSubCategoriesByParentId : (parentId)=>{
        return async (dispatch)=>{
            let response = await axios.get(`http://localhost:4000/api/subcategories/${parentId}`)
            dispatch({type: "GET_SUBCATEGORIES_BY_PARENT", payload: response.data})
        }
    },
    uploadCategory : (category)=>{
        console.log(category)
        return async (dispatch)=>{         
            let response = await axios.post("http://localhost:4000/api/category", {name:category})
            dispatch({type: "UPLOAD_CATEGORY", payload: response.data})

        }
    },
    sendDeleteSlug : (slug)=>{
        return (dispatch)=>{
            dispatch({type: "SEND_DELETE_SLUG", payload: slug})
        }
    },
    deleteCategory : (id)=>{
        return async (dispatch)=>{
            let response = await axios.delete(`http://localhost:4000/api/category/${id}`)
            dispatch({type:"DELETE_CATEGORY", payload:response.data})
        }
    }

}

export default categoryActionsRedux