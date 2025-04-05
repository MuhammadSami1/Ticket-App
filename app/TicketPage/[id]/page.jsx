import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Tickets/${id}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch ticket");
    }

    return data.foundTicket;
  } catch (error) {
    console.error("Error fetching ticket:", error.message);
    throw error; // Re-throw to handle in the component
  }
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id !== "new";
  let updateTicketData = { _id: "new" };

  try {
    if (EDITMODE) {
      updateTicketData = await getTicketById(params.id);
      if (!updateTicketData) throw new Error("Ticket not found");
    }
  } catch (error) {
    return <div>Error: {error.message}</div>; // Show user-friendly error
  }

  return <TicketForm ticket={updateTicketData} />;
};
