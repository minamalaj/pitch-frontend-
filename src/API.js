const baseURL = "http://localhost:3000"
const loginURL = `${baseURL}/admin`
const validateURL = `${baseURL}/validate`
// const siteSuggestionURL = `${baseURL}/suggest-site`
const pitchesURL = "http://localhost:3000/pitches"

const getToken = () => {
    return localStorage.getItem("userJWT");
};

const fetchGetWithToken = (path, method = "get") => {
    return fetch(`${baseURL}${path}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};


const deletePitchWithToken = pitch => {
  const configObj = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return fetch(`${pitchesURL}/${pitch.id}`, configObj)
  //  .then(resp => resp.json())
  //  .then(console.log);
};

const patchPitchWithToken = pitch => {
  const configObj = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(pitch),
  };
  return fetch(`${pitchesURL}/${pitch.id}`, configObj);
};

const postFetch = (url, data) => { 
  const configObject = { 
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    }, 
    body: JSON.stringify(data)
  } 
  
  return fetch(url, configObject)
} 

const get = (url, token) => {
    return token ? fetch(url, { headers: { AUTHORIZATION: token } }) : fetch(url)
  }

const validate = token => {
    return get(validateURL, token).then(response => response.json())
}

const login = data => {
    return postFetch(loginURL, data).then(response => response.json())
}
  
// export const postFetchWithToken = (path, payload) => {
//     const configObj = {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${getToken()}`,
//             "Content-Type": "application/json",
//             Accept: "application/json",
//         },
//         body: JSON.stringify(payload),
//     };
//     // console.log(configObj);
//     return fetch(`${baseURL}${path}`, configObj);
// };

// const getItems = token => {
//     return get(itemsURL, token).then(response => response.json())
// }
  
export default { login, validate, postFetch, get, deletePitchWithToken, patchPitchWithToken, getToken, fetchGetWithToken}