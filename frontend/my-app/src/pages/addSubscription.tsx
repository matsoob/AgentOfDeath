import { useEffect, useState } from "react";

export interface SubcriptionManagerProps {
  nameOfDeceased: string;
  emailOfDeceased: string;
}

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

async function update(sub_name: string, status: string) {
  try {
    // name_of_sub: str, status
    const result = await fetch(
      `http://localhost:8000/update-sub?name_of_sub=${sub_name}&status=${status}`
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

export function SubscriptionManager(props: SubcriptionManagerProps) {
  const [tableData, setTableData] = useState([] as Array<any>);
  const [subName, setSubName] = useState("");
  useEffect(() => {
    refreshAllSubs(setTableData);
  }, []);

  const onButtonClick = () => {
    addSubscription(subName);
    refreshAllSubs(setTableData);
  };

  const onConfirmClick = (rowSubName: string) => {
    update(rowSubName, "NEED_TO_CANCEL");
    refreshAllSubs(setTableData);
  };

  const cancelSubscription = async (
    subName: string,
    email: string,
    name: string
  ) => {
    const data = {
      service: subName,
      email,
      name,
    };
    try {
      const result = await fetch(
        `http://localhost:8000/v0/cancel?name_of_sub=${subName}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.ok) {
        const content = await result.json();
        if (content.email === "UNKNOWN") {
          await update(subName, "REQUIRES_AGENT_CANCELLATION");
          // "REQUIRES_AGENT_CANCELLATION",
        } else {
          await update(subName, "READY_TO_SEND_EMAIL");
        }
        return;
      } else {
        throw new Error("There was an error adding subscription to the list");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onCancelClick = async (rowSubName: string) => {
    await update(rowSubName, "CANCELLING");
    await refreshAllSubs(setTableData);
    cancelSubscription(rowSubName, props.emailOfDeceased, props.nameOfDeceased);
    // update(rowSubName, "CANCELLING");
    // refreshAllSubs(setTableData);
    // console.log(result);
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
              <th className="py-2 px-4 text-center">Next Steps</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((val, key) => (
              <tr key={key} className="hover:bold">
                <td className="py-2 px-4">{val.name_of_sub}</td>
                <td className="py-2 px-4 text-center">{val.status}</td>
                <td className="py-2 px-4 text-center">
                  {val.status === "UNKNOWN" ? (
                    <button onClick={() => onConfirmClick(val.name_of_sub)}>
                      Confirm Cancellation Required
                    </button>
                  ) : (
                    <button onClick={() => onCancelClick(val.name_of_sub)}>
                      {val.status === "NEED_TO_CANCEL"
                        ? "Cancel"
                        : "We are working on this"}
                    </button>
                  )}
                </td>
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
}
