import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  make: "",
  Category: "",
  model: "",
  type: "",
  year: "",
  registration: "",
  color: "",
  colorName: "",
  fuelType: "",
  transmission: "",
  odometer: "",
  passengers: "",
  country: "",
  Ownership: "",
  Drivetrain: "",
  city: "",
  postalCode: "",
  lateHour: "",
  lateDay: "",
  rentHour: "",
  rentDay: "",
  rentWeek: "",
  rentMonth: "",
  mlFee: "",
  mlDay: "",
  mlWeek: "",
  mlMonth: "",
  insNo: "",
  insCompany: "",
  insStart: "",
  insEnd: "",
  insPayable: "",
  insRecurringPeriod: "",
  insRecurringDate: "",
  insDeductible: "",
  insRemarks: "",
  fuelCapacity: "",
  engineVolume: "",
  vinNo: "",
  insImage: [],
  features: [],
  otherNote: "",
  damages: [],
  carImages: [],
  damageImagesToDelete: [],
  thumbnailImage: 0,
};

export const VehicleSlice = createSlice({
  name: "Vehicle",
  initialState,
  reducers: {
    setmakeR: (state, action) => {
      state.make = action.payload;
    },
    setCategoryR: (state, action) => {
      state.Category = action.payload;
    },
    setmodelR: (state, action) => {
      state.model = action.payload;
    },
    settypeR: (state, action) => {
      state.type = action.payload;
    },
    setyearR: (state, action) => {
      state.year = action.payload;
    },
    setregistrationR: (state, action) => {
      state.registration = action.payload;
    },
    setcolorR: (state, action) => {
      state.color = action.payload;
    },
    setcolorNameR: (state, action) => {
      state.colorName = action.payload;
    },
    setfuelTypeR: (state, action) => {
      state.fuelType = action.payload;
    },
    settransmissionR: (state, action) => {
      state.transmission = action.payload;
    },
    setodometerR: (state, action) => {
      state.odometer = action.payload;
    },
    setpassengersR: (state, action) => {
      state.passengers = action.payload;
    },
    setcountryR: (state, action) => {
      state.country = action.payload;
    },
    setOwnershipR: (state, action) => {
      state.Ownership = action.payload;
    },
    setDrivetrainR: (state, action) => {
      state.Drivetrain = action.payload;
    },
    setcityR: (state, action) => {
      state.city = action.payload;
    },
    setpostalCodeR: (state, action) => {
      state.postalCode = action.payload;
    },
    setrentHour: (state, action) => {
      state.rentHour = action.payload;
    },
    setrentDay: (state, action) => {
      state.rentDay = action.payload;
    },
    setlateHour: (state, action) => {
      state.lateHour = action.payload;
    },
    setlateDay: (state, action) => {
      state.lateDay = action.payload;
    },
    setrentWeek: (state, action) => {
      state.rentWeek = action.payload;
    },
    setrentMonth: (state, action) => {
      state.rentMonth = action.payload;
    },
    setmlFee: (state, action) => {
      state.mlFee = action.payload;
    },
    setmlDay: (state, action) => {
      state.mlDay = action.payload;
    },
    setmlWeek: (state, action) => {
      state.mlWeek = action.payload;
    },
    setmlMonth: (state, action) => {
      state.mlMonth = action.payload;
    },
    setinsNo: (state, action) => {
      state.insNo = action.payload;
    },
    setinsCompany: (state, action) => {
      state.insCompany = action.payload;
    },
    setinsEnd: (state, action) => {
      state.insEnd = action.payload;
    },
    setinsPayable: (state, action) => {
      state.insPayable = action.payload;
    },
    setinsRecurringPeriod: (state, action) => {
      state.insRecurringPeriod = action.payload;
    },
    setinsRecurringDate: (state, action) => {
      state.insRecurringDate = action.payload;
    },
    setinsDeductible: (state, action) => {
      state.insDeductible = action.payload;
    },
    setinsStart: (state, action) => {
      state.insStart = action.payload;
    },
    setinsImage: (state, action) => {
      state.insImage = action.payload;
    },
    setinsRemarks: (state, action) => {
      state.insRemarks = action.payload;
    },
    setfeatures: (state, action) => {
      state.features = action.payload;
    },
    setengineVolume: (state, action) => {
      state.engineVolume = action.payload;
    },
    setotherNote: (state, action) => {
      state.otherNote = action.payload;
    },
    setdamages: (state, action) => {
      state.damages = action.payload;
    },
    setCarImages: (state, action) => {
      state.carImages = action.payload;
    },
    setvinNo: (state, action) => {
      state.vinNo = action.payload;
    },
    setfuelCapacity: (state, action) => {
      state.fuelCapacity = action.payload;
    },
    setdamageImagesToDelete: (state, action) => {
      state.damageImagesToDelete.push(...action.payload);
    },
    setthumbnailImage: (state, action) => {
      state.thumbnailImage = action.payload;
    },
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetState: () => initialState,
    resetting: (state, action) => {
      const keysToReset = action.payload;
      keysToReset.forEach((key:any) => {
        if (key in state) {
          state[key] = initialState[key];
        }
      });
    },
  },
});

export const {  setmakeR,
  setCategoryR,
  setmodelR,
  settypeR,
  setyearR,
  setregistrationR,
  setcolorR,
  setcolorNameR,
  setfuelTypeR,
  settransmissionR,
  setodometerR,
  setpassengersR,
  setcountryR,
  setOwnershipR,
  setDrivetrainR,
  setcityR,
  setpostalCodeR,
  setrentHour,
  setrentDay,
  setlateHour,
  setlateDay,
  setrentWeek,
  setrentMonth,
  setinsNo,
  setinsCompany,
  setinsEnd,
  setinsStart,
  setfeatures,
  setotherNote,
  setdamages,
  setCarImages,
  setAllValues,
  setdamageImagesToDelete,
  setthumbnailImage,
  setvinNo,
  resetState,
  setengineVolume,
  setfuelCapacity,
  setmlDay,
  setmlFee,
  setmlMonth,
  setmlWeek,
  setinsPayable,
  setinsDeductible,
  setinsRecurringPeriod,
  setinsRecurringDate,
  setinsRemarks,
  setinsImage,
  resetting,
} = VehicleSlice.actions;

export default VehicleSlice.reducer;
