import { NextResponse } from "next/server";
import Ticket from "@/app/(models)/Ticket";
import mongoose from "mongoose"; // Import mongoose for ObjectId validation

export async function GET(req, { params }) {
    try {
        const { id } = params;

        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid ticket ID format" },
                { status: 400 }
            );
        }

        const foundTicket = await Ticket.findOne({ _id: id });

        if (!foundTicket) {
            return NextResponse.json(
                { message: "Ticket not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ foundTicket }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid ticket ID format" },
                { status: 400 }
            );
        }

        await Ticket.findByIdAndDelete(id);
        return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error", error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const body = await req.json();
        const ticketData = body.formData;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid ticket ID format" },
                { status: 400 }
            );
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(id, ticketData, {
            new: true, // Return the updated document
        });

        return NextResponse.json(
            { message: "Ticket Updated", updatedTicket },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error", error: error.message },
            { status: 500 }
        );
    }
}