import { FC, useEffect, useState } from "react";


async function addSubscription() {
    try {
        // name_of_sub: str, status
        const result = await fetch(`http://localhost:8000/add-sub?name_of_sub=${}&status=${}`);
        const foo = await result.json();
      } catch (e) {
        console.log(e);
      }
}
export const SubscriptionManager: FC<any> = () => {
  const [tableData, setTableData] = useState([] as Array<any>);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch("http://localhost:8000/get-all-subs");
        const foo = await result.json();
        setTableData(foo as unknown as Array<any>);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div>
      <table>
        <tr>
          <th>Name of Subscription</th>
          <th>Status</th>
          {tableData.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name_of_sub}</td>
                <td>{val.status}</td>
              </tr>
            );
          })}
        </tr>
      </table>
    </div>
  );
};
