import axios from "axios";
import {user} from "../stores.js"

export class PlacemarkService {
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    const winemarkCredentials = localStorage.winemark
    if (winemarkCredentials) {
      const savedUser = JSON.parse(winemarkCredentials)
      user.set({
        email: savedUser.email,
        token: savedUser.token,
        _id: savedUser._id,
      });
      axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
    }
  }
  
  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token,
          _id: response.data._id,
        });
        localStorage.winemark = JSON.stringify({email:email, token:response.data.token, _id: response.data._id});
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: "",
      _id: "",
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("winemark");
  }

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(this.baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getRegions() {
    try {
      const response = await axios.get(this.baseUrl + "/api/regions");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getRegion(name) {
    try {
      const response = await axios.get(this.baseUrl + "/api/regions/" + name);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getPlacemarks() {
    try {
      const response = await axios.get(this.baseUrl + "/api/placemarks");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getPlacemark(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/placemarks/" + id);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async addPlacemark(placemark) {
    try {
      const response = await axios.post(this.baseUrl + "/api/placemarks", placemark);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async deletePlacemark(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/placemarks/" + id);
      return response;
    } catch (error) {
      return false;
    }
  }

  async uploadImage(placemark) {
    try {
      const response = await axios.post(this.baseUrl + "/api/placemarks/" + placemark._id, placemark);
      return response.data;
    } catch (error) {
      return false;
    }
  }
}