import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const SelectionContentEvent = () => {
    const [eventTitle, setEventTitle] = useState<string>("");
    const [eventLocation, setEventLocation] = useState<string>("");
    const [eventStart, setEventStart] = useState<string>("");
    const [eventEnd, setEventEnd] = useState<string>("");
    const [eventDescription, setEventDescription] = useState<string>("");

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                    id="event-title"
                    placeholder="Meeting"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <Input
                    id="event-location"
                    placeholder="Conference Room"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                    <Label htmlFor="event-start">Start</Label>
                    <Input
                        id="event-start"
                        type="datetime-local"
                        value={eventStart}
                        onChange={(e) => setEventStart(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="event-end">End</Label>
                    <Input
                        id="event-end"
                        type="datetime-local"
                        value={eventEnd}
                        onChange={(e) => setEventEnd(e.target.value)}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                    id="event-description"
                    placeholder="Event details..."
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    rows={3}
                />
            </div>
        </>
    );
};
