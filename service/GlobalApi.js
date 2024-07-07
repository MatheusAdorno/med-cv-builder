import axios from 'axios'

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL+"api/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
});

const CreateNewCurriculum = (data) => axiosClient.post("/user-curricula", data)

const GetUserCurriculum = (userEmail) => axiosClient.get("/user-curricula?filters[userEmail][$eq]=" + userEmail)

const UpdateCurriculumDetails = (id, data) => axiosClient.put("/user-curricula/" + id, data)

const GetCurriculumById = (id) => axiosClient.get("/user-curricula/" + id + "?populate=*")

const DeleteResumeById = (id) => axiosClient.delete("/user-curricula/" + id)

export default { CreateNewCurriculum, GetUserCurriculum, UpdateCurriculumDetails, GetCurriculumById, DeleteResumeById }