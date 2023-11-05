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

  const isInputInvalid = !subName;
  return (
    <div>
      <div className="mb-6">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Name of Subscription</th>
              <th className="py-2 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((val, key) => (
              <tr key={key} className="hover:bold">
                <td className="py-2 px-4">{val.name_of_sub}</td>
                <td className="py-2 px-4 text-center">{val.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <span className="text-xl font-bold">Add Subscription</span>
        <textarea
          id="add-subscription"
          className="w-full p-2 mt-2 border border-gray-300 rounded"
          placeholder="Input the subscription you would like to cancel"
          value={subName}
          onChange={(e) => setSubName(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onButtonClick}
          disabled={isInputInvalid}
        >
          Send
        </button>
      </div>
    </div>
  );
};
