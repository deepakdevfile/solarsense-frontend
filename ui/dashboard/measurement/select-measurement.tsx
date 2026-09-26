'use client'

import React, { useState } from "react";
import { InstallationID } from "@/lib/types";
import { importMeasurements } from "@/lib/actions";
import { syncWeather } from "@/lib/actions";

export default function SelectMeasurement({
  installations,
}: {
  installations: [InstallationID];
}) {
  const [selected, setSelected] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  function handleFileChnage(e: React.ChangeEvent){
    const target = e.target as HTMLInputElement;
    const selectedFile = target.files?.[0] ?? null;
    // console.log(selectedFile)
    setFile(selectedFile)
    // console.log(file)
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>){
    setSelected(Number(e.target.value));
    // console.log(selected);
  }

  async function importCSV(){
    if(!file || !selected){
        return;
    }
    // console.log(file);
    // console.log(selected); 
    // console.log("we are going to make the request from component")

    const csvfile = await importMeasurements(selected, file);
    // console.log(csvfile)
    // console.log(csvfile); // -> return the inserted, skipped, rejected and errors during importing measurements
    setMessage(`Imported ${csvfile?.inserted}, skipped ${csvfile?.skipped_duplicates}, rejected ${csvfile?.rejected} `)
    // set some maessage on dashboard about loading status of file
  }

   async function syncWeatherData(){
    const weatherData = await syncWeather(selected);
    // console.log(weatherData); // -> number of inserted rows in database for that perticular location 
    setMessage(`Weather sync added ${weatherData?.inserted} new observations.`)
  }

  return (
    <>
      <label htmlFor="selectSection">Select Installation</label>
      <select
        name="selectList"
        id="selectList"
        value={selected}
        onChange={handleSelect}
        className="mt-4 w-full rounded-lg border p-2.5"
      >
        <option value="">--Please select an Installation--</option>
        {installations.map((installation) => (
          <option value={installation.id} key={installation.id}>
            {installation.name}
          </option>
        ))}
      </select>
      <div className="mt-4 flex flex-wrap gap-3">
        <input
          type="file"
          accept=".csv, text/csv"
          onChange={handleFileChnage}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-solar-500 "
        />
        <button
          disabled={!file || !selected}
          onClick={importCSV}
          className="rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-50 "
        >
          Import CSV
        </button>
        <button
          disabled={!selected}
          onClick={syncWeatherData}
          className="rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-50 "
        >
          Sync weather
        </button>
        {message && (
          <p className="rounded bg-green-50 p-3 text-green-700">{message}</p>
        )}
      </div>
    </>
  );
}