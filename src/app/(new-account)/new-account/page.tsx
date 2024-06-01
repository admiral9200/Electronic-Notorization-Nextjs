import { NewAccountForm } from "@/components/forms/new-account-form";

export default function NewAccountPage(): JSX.Element {
  return (
        <div className="flex flex-1 justify-center items-center w-full px-12 sm:px-18 md:px-24 lg:px-56 py-24">
          <NewAccountForm />
        </div>
  )
}
