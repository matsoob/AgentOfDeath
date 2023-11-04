import Head from "next/head";
import { useState, useEffect } from "react";

export async function Notes(): Promise<string> {
  console.log("in notes");
  console.log("ASDASDFASDFADFDFA");
  try {
    const res = await fetch(`http://localhost:8000/notes/`);
    const json = await res.json();
    console.log(json);
    return json;
  } catch (e) {
    return "fooo";
  }
}
