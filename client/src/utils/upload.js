// import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";


// const storage = getStorage();
const uploadFile = async (file, name) => {
  console.log(file);
  const storageRef = ref(storage, name? name : file.name);
  const response = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(response.ref);
  return downloadURL;
};

export default uploadFile;