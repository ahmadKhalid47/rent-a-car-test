"use client";
import { TempTypeInput, TypeInput } from "../../InputComponents/TypeInput";
import {
  SelectInput,
  TempSelectInput,
} from "../../InputComponents/SelectInput";
import {
  setrefNameR,
  setrefPhoneR,
  setrefAddressR,
  setrefRelationR,
  setemergencyNameR,
  setemergencyPhoneR,
  setemergencyRelationR,
  setadditionalR,
} from "@/app/store/chauffeur";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";

export default function Feature() {
  let chauffeur = useSelector((state: RootState) => state.chauffeur);
  let dispatch = useDispatch();

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
          Reference Info
        </h3>
        <TempTypeInput
          setState={setrefNameR}
          label={"Full Name"}
          value={chauffeur.ref1Name}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setrefPhoneR}
          label={"Phone"}
          value={chauffeur.ref1Phone}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setrefAddressR}
          label={"Address"}
          value={chauffeur.ref1Address}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setrefRelationR}
          label={"Relation"}
          value={chauffeur.ref1Relation}
          required={false}
          options={["Select", "Father", "Mother", "Brother", "Other"]}
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
          Emergency Info
        </h3>
        <TempTypeInput
          setState={setemergencyNameR}
          label={"Emergency Contact Name"}
          value={chauffeur.emergencyContactName}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setemergencyRelationR}
          label={"Relation"}
          value={chauffeur.emergencyContactRelation}
          required={false}
          options={["Father", "Mother", "Brother", "Other"]}
        />
        <TempTypeInput
          setState={setemergencyPhoneR}
          label={"Emergency Phone"}
          value={chauffeur.emergencyContactPhone}
          required={false}
          type={"text"}
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
          Additional Notes
        </h3>
        <div className="w-[100%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <textarea
              className="w-full pe-2 py-3 font-[400] text-[16px] leading-[19px] ps-2  flex justify-between items-center input-color rounded-xl border-2 border-grey"
              rows={6}
              cols={6}
              onChange={(e) => dispatch(setadditionalR(e.target.value))}
              value={chauffeur.additional}
              placeholder="Any Additional Notes"
            >
              Any Additional Notes
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
