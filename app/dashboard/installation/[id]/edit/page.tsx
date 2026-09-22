import { EditForm } from "../../../../../ui/dashboard/installation/installation-edit-form";
import { getInstallationById } from "../../../../../lib/data"

export default async function Page(props: {params: Promise<{id: string}>}){
    const params = await props.params;
    const id = Number(params.id);
    const installation = await getInstallationById(id);

    return (
      <>
        <EditForm installation = {installation} />
      </>
    );
}