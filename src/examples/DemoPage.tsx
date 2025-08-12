"use client"

import { useState } from "react"
// Move imports to the top of the file to use the root index.ts file
// Replace all individual imports with:

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Checkbox,
  Radio,
  Switch,
  Select,
  FloatingLabelInput,
  Label,
  Alert,
  ProgressBar,
  Tabs,
  Accordion,
  Breadcrumb,
  Dropdown,
  Steps,
  Calendar,
  DatePicker,
  Timeline,
  DataTable,
  Dialog,
  Drawer,
  Tooltip,
  Collapsible,
  Toast,
} from "../components"

export const DemoPage = () => {
  // States for interactive components
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [showToast, setShowToast] = useState(false)

  // Demo data
  const tabItems = [
    { label: "Profile", content: <p>Profile content here</p> },
    { label: "Settings", content: <p>Settings content here</p> },
    { label: "Messages", content: <p>Messages content here</p> },
  ]

  const accordionItems = [
    { title: "Section 1", content: <p>Content for section 1</p> },
    { title: "Section 2", content: <p>Content for section 2</p> },
    { title: "Section 3", content: <p>Content for section 3</p> },
  ]

  const breadcrumbItems = [{ label: "Home", href: "#" }, { label: "Products", href: "#" }, { label: "Y2K UI Kit" }]


  const stepsItems = [
    { label: "Step 1", description: "Personal information" },
    { label: "Step 2", description: "Account details" },
    { label: "Step 3", description: "Confirmation" },
  ]

  const timelineItems = [
    {
      title: "Account Created",
      content: "Your account was created successfully.",
      date: "Jan 20, 2023",
      status: "success" as const,
    },
    {
      title: "Profile Updated",
      content: "You updated your profile information.",
      date: "Jan 22, 2023",
      status: "default" as const,
    },
    {
      title: "Password Changed",
      content: "Your password was changed.",
      date: "Feb 5, 2023",
      status: "warning" as const,
    },
  ]

  const tableColumns: any = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    {
      header: "Actions",
      accessor: (row: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="secondary">
            Edit
          </Button>
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      ),
      className: "w-1/4",
    },
  ]

  const tableData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Anna Smith", email: "anna@example.com", role: "User" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-y2k-silver-light/50 to-white">
      {/* Header */}
      <header className="py-8 px-4 bg-gradient-y2k-blue text-white text-center">
        <h1 className="text-4xl font-bold mb-2">Y2K UI Library</h1>
        <p className="text-xl">React components with a retro-futuristic 2000s aesthetic</p>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">UI Component Library with Y2K Style</h2>
          <p className="max-w-2xl mx-auto mb-8">
            A complete collection of React components with the visual aesthetic of the 2000s. Bold gradients,
            embossed effects, shiny borders, and vibrant colors.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="secondary" size="lg">
              Documentation
            </Button>
          </div>
        </section>

        {/* Buttons */}
        <section id="buttons" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Buttons</h2>
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different styles and sizes for buttons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Sizes</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button size="sm">Small</Button>
                    <Button>Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button disabled>Disabled</Button>
                    <Button leftIcon={<span>👍</span>}>With Left Icon</Button>
                    <Button rightIcon={<span>🚀</span>}>With Right Icon</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inputs and Forms */}
        <section id="inputs" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Inputs and Forms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Text Fields</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Standard Input" placeholder="Type here" />
                <Input label="Disabled Input" placeholder="Disabled" disabled />
                <Input label="With Error" placeholder="Error state" error="This field is required" />
                <FloatingLabelInput label="Floating Label" />
                <Textarea label="Text Area" placeholder="Enter multiple lines of text" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selection Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Checkboxes</Label>
                  <Checkbox label="Accept terms and conditions" />
                  <Checkbox label="Subscribe to the newsletter" />
                </div>

                <div className="space-y-2">
                  <Label>Radio Buttons</Label>
                  <Radio name="option" label="Option 1" value="1" />
                  <Radio name="option" label="Option 2" value="2" />
                </div>

                <div className="space-y-2">
                  <Label>Switches</Label>
                  <Switch label="Enable notifications" />
                  <Switch label="Dark mode" />
                </div>

                <Select
                  label="Select an option"
                  options={[
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3", disabled: true },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards */}
        <section id="cards" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>A simple card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the main content of the card.</p>
              </CardContent>
            </Card>

            <Card variant="primary" hover={true}>
              <CardHeader>
                <CardTitle>Card with Hover</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This card has a hover effect. Hover over it to see.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            
          </div>
        </section>

        {/* Alerts and Feedback */}
        <section id="alerts" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Alerts and Feedback</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Alert variant="info" title="Information" onClose={() => {}}>
                  This is an informational alert.
                </Alert>

                <Alert variant="success" title="Success">
                  Your changes have been saved successfully.
                </Alert>
              </div>

              <div className="space-y-4">
                <Alert variant="warning" title="Warning">
                  Please review your information before continuing.
                </Alert>

                <Alert variant="error" title="Error">
                  An error occurred while processing your request.
                </Alert>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Progress Bars</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar value={25} showLabel />
                <ProgressBar value={50} variant="success" showLabel />
                <ProgressBar value={75} variant="warning" showLabel />
                <ProgressBar value={100} variant="error" showLabel />
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-4 justify-center">
              {/* Ensure each Tooltip has a valid child */}
              <Tooltip content="This is a tooltip" position="top">
                <Button>Hover (Top)</Button>
              </Tooltip>

              <Tooltip content="Tooltip on the right" position="right">
                <Button variant="secondary">Hover (Right)</Button>
              </Tooltip>

              <Tooltip content="Tooltip below" position="bottom">
                <Button variant="destructive">Hover (Bottom)</Button>
              </Tooltip>

              <Tooltip content="Tooltip on the left" position="left">
                <Button variant="ghost">Hover (Left)</Button>
              </Tooltip>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => setShowToast(true)} variant="primary">
                Show Toast
              </Button>

              {showToast && (
                <Toast variant="success" title="Successful Operation!" visible={true} onClose={() => setShowToast(false)}>
                  This is a toast notification that will disappear automatically.
                </Toast>
              )}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section id="navigation" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Navigation Components</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs items={tabItems} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accordion</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion items={accordionItems} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Breadcrumb</CardTitle>
              </CardHeader>
              <CardContent>
                <Breadcrumb items={breadcrumbItems} />
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Steps and Timeline */}
        <section id="steps-timeline" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Steps and Timeline</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Steps / Wizard</CardTitle>
              </CardHeader>
              <CardContent>
                <Steps steps={stepsItems} currentStep={currentStep} />
                <div className="mt-6 flex justify-between">
                  <Button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
                    Previous
                  </Button>
                  <Button onClick={() => setCurrentStep(Math.min(stepsItems.length - 1, currentStep + 1))}>
                    {currentStep === stepsItems.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline items={timelineItems} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Date and Calendar */}
        <section id="date-components" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Date Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  value={selectedDate}
                  onChange={(date:Date) => {
                    console.log("Fecha seleccionada:", date)
                    setSelectedDate(date)
                  }}
                  locale="es-ES"          // Idioma español
                  weekStartsOn={1}        // Semana empieza en lunes
                  showOutsideDays={true}  // Muestra días fuera del mes actual
                  className="max-w-sm"    // Ancho máximo
                  
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date Picker</CardTitle>
              </CardHeader>
              <CardContent>
                <DatePicker label="Select a date" value={selectedDate} onChange={setSelectedDate} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Data Table */}
        <section id="data-table" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Data Table</h2>
          <Card>
            <CardHeader>
              <CardTitle>Users Table</CardTitle>
              <CardDescription>Example data table with pagination</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                  columns={tableColumns}
                  data={tableData}
                  keyField="id"
                  pageSize={2}
                  onEdit={(original, editado) => {
                    // acá ya “finalizó la edición”; persistí cambios
                    console.log("EDIT:", { original, editado })
                  }}
                  onDelete={(row) => {
                    console.log("DELETE:", row)
                  }}
                  // opcional: limitar columnas editables
                  editableColumns={["name", "email", "role"]}
                />
            </CardContent>
          </Card>
        </section>

        {/* Dialogs and Drawers */}
        <section id="dialogs-drawers" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Dialogs and Drawers</h2>
          <Card>
              <CardHeader>
                <CardTitle>Modal Components</CardTitle>
              </CardHeader>
            <CardContent className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
              <Button onClick={() => setIsDrawerOpen(true)} variant="secondary">
                Open Drawer
              </Button>

              <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="Dialog Title"
                description="This is a description of the dialog content."
                footer={
                  <>
                    <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Confirm</Button>
                  </>
                }
              >
                <p>This is the main content of the dialog.</p>
              </Dialog>

              <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Drawer Title">
                <div className="space-y-4">
                  <p>This is the content of the side drawer.</p>
                  <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
                </div>
              </Drawer>
            </CardContent>
          </Card>
        </section>

        {/* Collapsible */}
        <section id="collapsible" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Collapsible</h2>
          <Collapsible title="Click to expand/collapse" defaultOpen={true}>
            <div className="p-4">
              <p>This is the collapsible content that can be expanded or collapsed.</p>
              <p className="mt-2">You can include any type of content here, including other components.</p>
            </div>
          </Collapsible>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gradient-y2k-silver text-center">
        <p className="text-gray-700 font-bold">Y2K UI Library © 2023</p>
        <p className="text-gray-600 mt-2">A React component library with a retro-futuristic aesthetic</p>
      </footer>
    </div>
  )
}

