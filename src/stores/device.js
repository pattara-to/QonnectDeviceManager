import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:1880";

export const useDeviceStore = defineStore("device", {
    state: () => ({
        list: [],
        alertList: [],
        selectedDevice: {},
    }),
    actions: {
        async loadDevices() {
            try {
                const response = await axios.get(`${BASE_URL}/devices`);
                this.list = response.data;
            } catch (error) {
                console.log("error", error);
            }
        },
        async loadDevice(deviceID) {
            try {
                const response = await axios.get(`${BASE_URL}/device/${deviceID}`);
                this.selectedDevice = response.data[0];
            } catch (error) {
                console.log("error", error);
            }
        },
        async loadAlerts(deviceID) {
            try {
                const response = await axios.get(`${BASE_URL}/alerts/${deviceID}`);
                this.alertList = response.data;
            } catch (error) {
                console.log("error", error);
            }
        },
        async addDevice(deviceData) {
            if (deviceData.name != "" && deviceData.MAC != "") {
                try {
                    console.log(deviceData);
                    const response = await axios.post(`${BASE_URL}/devices`, deviceData);
                    console.log("Add Device Success");
                } catch (error) {
                    console.log("error", error);
                }
            }
        },
        async addAlert(alertData) {
            try {
                const response = await axios.post(`${BASE_URL}/alerts`, alertData);
                console.log("Add Alert Success");
            } catch (error) {
                console.log("error", error);
            }
        },
        async editDevice(deviceID, deviceData) {
            try {
                const response = await axios.post(`${BASE_URL}/edit-device/${deviceID}`, deviceData);
                console.log("Edit Device Success");
            } catch (error) {
                console.log("error", error);
            }
        },
        async editAlert(alertID, alertData) {
            try {
                const response = await axios.post(`${BASE_URL}/edit-alert/${alertID}`, alertData);
                console.log("Edit Alert Success");
            } catch (error) {
                console.log("error", error);
            }
        },
        async removeDevice(deviceID) {
            try {
                const response = await axios.post(`${BASE_URL}/remove-device/${deviceID}`);
                console.log("Remove Device Success");
            } catch (error) {
                console.log("error", error);
            }
        },
        async removeAlert(alertID) {
            try {
                const response = await axios.post(`${BASE_URL}/remove-alert/${alertID}`);
                console.log("Remove Alert Success");
            } catch (error) {
                console.log("error", error);
            }
        },
        async register(userData) {
            try {
                const response = await axios.post(`${BASE_URL}/register`, userData);
                console.log("Register Success");
            } catch (error) {
                console.log("error", error);
            }
        },
        async login(userData) {
            try {
                const response = await axios.post(`${BASE_URL}/login`, userData);
                console.log(response);
                return response.data;
            } catch (error) {
                console.log("error", error.response.data.message);
            }
        },
    },
});
