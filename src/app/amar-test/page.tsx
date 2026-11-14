"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { UserAccountIcon, Tick02Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { POST } from "../api/auth/[...all]/route"

const countries = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
    { label: "Bangladesh", value: "bd" },
    { label: "India", value: "in" },
    { label: "Australia", value: "au" },
]

type FormValues = Record<string, FormDataEntryValue>

export default function AmarTestPage() {
    const [country, setCountry] = useState("bd")
    const [submitted, setSubmitted] = useState<FormValues | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const values: FormValues = Object.fromEntries(new FormData(form).entries())

        console.log("Submitted form:", values)
        setSubmitted(values)
        form.reset()
        setCountry("bd")
        console.log(submitted)

        const fetchdata = await fetch("http://localhost:8000/AmarPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitted),
        });
        console.log(fetchdata)
    }

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6">
            {/* Ambient background */}
            <div className="pointer-events-none absolute -top-40 left-1/4 size-[28rem] rounded-full bg-violet-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-40 right-1/4 size-[28rem] rounded-full bg-indigo-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

            <div className="relative z-10 w-full max-w-lg">
                <div className="rounded-3xl border bg-card/80 p-6 shadow-xl shadow-foreground/5 backdrop-blur-xl sm:p-8">
                    <div className="mb-7 flex items-start gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                            <HugeiconsIcon icon={UserAccountIcon} strokeWidth={1.8} className="size-5" />
                        </span>
                        <div className="space-y-1">
                            <h1 className="text-xl font-semibold tracking-tight">Personal information</h1>
                            <p className="text-sm text-muted-foreground">
                                Fill in your details below. It only takes a minute.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <FieldSet>
                            <FieldLegend variant="label" className="sr-only">
                                Personal information
                            </FieldLegend>

                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Forhad Shorif"
                                        autoComplete="name"
                                        required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        autoComplete="email"
                                        required
                                    />
                                    <FieldDescription>
                                        We&apos;ll never share your email with anyone.
                                    </FieldDescription>
                                </Field>

                                <div className="grid gap-7 sm:grid-cols-2 sm:gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="+880 1XXX-XXXXXX"
                                            autoComplete="tel"
                                            required
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="nid">NID</FieldLabel>
                                        <Input
                                            id="nid"
                                            name="nid"
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="123 456 7890"
                                            required
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="dob">Date of birth</FieldLabel>
                                        <Input id="dob" name="dob" type="date" required />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="country">Country</FieldLabel>
                                        <Select
                                            items={countries}
                                            name="country"
                                            value={country}
                                            onValueChange={(value) => setCountry(value ?? "bd")}
                                            required
                                        >
                                            <SelectTrigger id="country" className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {countries.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>

                                <Field>
                                    <FieldLabel htmlFor="address">Address</FieldLabel>
                                    <Input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="123 Main St, Dhaka"
                                        autoComplete="street-address"
                                    />
                                    <FieldDescription>Optional — your street address.</FieldDescription>
                                </Field>

                                <Field orientation="horizontal" className="justify-end gap-3">
                                    <Button
                                        type="reset"
                                        variant="outline"
                                        onClick={() => {
                                            setCountry("bd")
                                            setSubmitted(null)
                                        }}
                                    >
                                        Reset
                                    </Button>
                                    <Button type="submit">Submit</Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </form>

                    {submitted ? (
                        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                            <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="size-4" />
                                Form submitted successfully
                            </p>
                            <pre className="mt-3 overflow-x-auto text-xs leading-relaxed text-muted-foreground">
                                {JSON.stringify(submitted, null, 2)}
                            </pre>
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    )
}
