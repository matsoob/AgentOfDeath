import { FC, useEffect, useState } from "react";

async function refreshAllSubs(setTableData: (input: Array<any>) => void) {
  try {
    const result = await fetch("http://localhost:8000/get-all-subs");
    const foo = await result.json();
    setTableData(foo as unknown as Array<any>);
  } catch (e) {
    console.log(e);
  }
}
async function addSubscription(sub_name: string) {
  try {
    // name_of_sub: str, status
    const result = await fetch(
      `http://localhost:8000/add-sub?name_of_sub=${sub_name}`
    );
    if (result.ok) {
      return;
    } else {
      throw new Error("There was an error adding subscription to the list");
    }
  } catch (e) {
    console.log(e);
  }
}

export const SubscriptionManager: FC<any> = () => {
  const [tableData, setTableData] = useState([] as Array<any>);
  const [subName, setSubName] = useState("");
  useEffect(() => {
    refreshAllSubs(setTableData);
  }, []);

  const onButtonClick = () => {
    addSubscription(subName);
    refreshAllSubs(setTableData);
  };

  const isInputValid = !!subName;
  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name of Subscription</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name_of_sub}</td>
                  <td>{val.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <span>Add Subscription</span>
        <textarea
          id="add-subsctiption"
          placeholder="Input the subscription you would like cancelled"
          value={subName}
          onChange={(foo) => setSubName(foo.target.value)}
        />
        <button onClick={onButtonClick} disabled={isInputValid}>
          send
        </button>
      </div>
    </div>
  );
};
