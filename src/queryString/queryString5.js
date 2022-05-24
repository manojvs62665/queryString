import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useQuery } from "react-query";
import axios from "axios";

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});

const carList = [
    {
        name: "BMW M6",
        url:
            "https://mediapool.bmwgroup.com/cache/P9/201411/P90169551/P90169551-the-new-bmw-m6-coup-exterior-12-2014-600px.jpg",
        release_year: 2020
    },
    {
        name: "VW Polo",
        url:
            "https://cdn.euroncap.com/media/30740/volkswagen-polo-359-235.jpg?mode=crop&width=359&height=235",
        release_year: 2018
    },
    {
        name: "Audi S6",
        url:
            "https://www.motortrend.com/uploads/sites/5/2020/03/6-2020-audi-s6.jpg?fit=around%7C875:492.1875",
        release_year: 2020
    },
    {
        name: "BMW M2",
        url:
            "https://imgd.aeplcdn.com/0x0/cw/ec/37092/BMW-M2-Exterior-141054.jpg?wm=0",
        release_year: 2019
    },
    {
        name: "Audi A3",
        url: "https://cdn.motor1.com/images/mgl/BEooZ/s3/2021-audi-s3.jpg",
        release_year: 2019
    }
];

function AppContent() {
  const filters = [{ id: 1 }];
  const { data } = useQuery(
    ["uniqueKey", filters], () => 
      axios
        .get("https://jsonplaceholder.typicode.com/users", { params: filters })
        .then((response) => response.data)
  );
    console.log('value', data)
  return (
    <>
         {data?.map((value, index) => {
          return (
            <div key={value.id}>
              <div>
                {value.name}
              </div>
            </div>
          )
        })}
    </>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}