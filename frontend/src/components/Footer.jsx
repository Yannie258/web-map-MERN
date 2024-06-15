import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <footer className="border-2 fixed bottom-0 w-full flex justify-center items-center bg-nav border-indigo-200 border-t-indigo-500 ">
      <Typography color="blue-gray" className="font-normal text-tertiary">
        &copy; 2024 Yen Nguyen
      </Typography>
    </footer>
  );
}

export default Footer
