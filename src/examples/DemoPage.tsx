"use client"

import { useState } from "react"
// Cambiar las importaciones al inicio del archivo para usar el archivo index.ts de la raíz
// Reemplazar todas las importaciones individuales con:

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
  // Estados para los componentes interactivos
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [showToast, setShowToast] = useState(false)

  // Demo data
  const tabItems = [
    { label: "Perfil", content: <p>Contenido del perfil aquí</p> },
    { label: "Ajustes", content: <p>Contenido de ajustes aquí</p> },
    { label: "Mensajes", content: <p>Contenido de mensajes aquí</p> },
  ]

  const accordionItems = [
    { title: "Sección 1", content: <p>Contenido para la sección 1</p> },
    { title: "Sección 2", content: <p>Contenido para la sección 2</p> },
    { title: "Sección 3", content: <p>Contenido para la sección 3</p> },
  ]

  const breadcrumbItems = [{ label: "Inicio", href: "#" }, { label: "Productos", href: "#" }, { label: "Y2K UI Kit" }]


  const stepsItems = [
    { label: "Paso 1", description: "Información personal" },
    { label: "Paso 2", description: "Detalles de cuenta" },
    { label: "Paso 3", description: "Confirmación" },
  ]

  const timelineItems = [
    {
      title: "Cuenta Creada",
      content: "Tu cuenta fue creada exitosamente.",
      date: "20 Ene, 2023",
      status: "success" as const,
    },
    {
      title: "Perfil Actualizado",
      content: "Actualizaste tu información de perfil.",
      date: "22 Ene, 2023",
      status: "default" as const,
    },
    {
      title: "Contraseña Cambiada",
      content: "Tu contraseña fue cambiada.",
      date: "5 Feb, 2023",
      status: "warning" as const,
    },
  ]

  const tableColumns :any= [
    { header: "Nombre", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Rol", accessor: "role" },
    {
      header: "Acciones",
      accessor: (row: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="secondary">
            Editar
          </Button>
          <Button size="sm" variant="destructive">
            Eliminar
          </Button>
        </div>
      ),
      className: "w-1/4",
    },
  ]

  const tableData = [
    { id: 1, name: "Juan Pérez", email: "juan@ejemplo.com", role: "Admin" },
    { id: 2, name: "Ana García", email: "ana@ejemplo.com", role: "Usuario" },
    { id: 3, name: "Carlos López", email: "carlos@ejemplo.com", role: "Editor" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-y2k-silver-light/50 to-white">
      {/* Header */}
      <header className="py-8 px-4 bg-gradient-y2k-blue text-white text-center">
        <h1 className="text-4xl font-bold mb-2">Y2K UI Library</h1>
        <p className="text-xl">Componentes React con estética retro-futurista de los 2000s</p>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Introducción */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Librería de Componentes UI con Estilo Y2K</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Una colección completa de componentes React con la estética visual de los años 2000. Degradados intensos,
            efectos de relieve, bordes brillantes y colores vibrantes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Comenzar</Button>
            <Button variant="secondary" size="lg">
              Documentación
            </Button>
          </div>
        </section>

        {/* Botones */}
        <section id="botones" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Botones</h2>
          <Card>
            <CardHeader>
              <CardTitle>Variantes de Botones</CardTitle>
              <CardDescription>Diferentes estilos y tamaños para los botones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Variantes</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Primario</Button>
                    <Button variant="secondary">Secundario</Button>
                    <Button variant="destructive">Destructivo</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Tamaños</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button size="sm">Pequeño</Button>
                    <Button>Mediano</Button>
                    <Button size="lg">Grande</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Estados</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button disabled>Deshabilitado</Button>
                    <Button leftIcon={<span>👍</span>}>Con Icono Izquierdo</Button>
                    <Button rightIcon={<span>🚀</span>}>Con Icono Derecho</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inputs y Formularios */}
        <section id="inputs" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Inputs y Formularios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campos de Texto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Input Estándar" placeholder="Escribe aquí" />
                <Input label="Input Deshabilitado" placeholder="Deshabilitado" disabled />
                <Input label="Con Error" placeholder="Estado de error" error="Este campo es obligatorio" />
                <FloatingLabelInput label="Label Flotante" />
                <Textarea label="Área de Texto" placeholder="Escribe múltiples líneas de texto" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Controles de Selección</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Checkboxes</Label>
                  <Checkbox label="Aceptar términos y condiciones" />
                  <Checkbox label="Suscribirse al newsletter" />
                </div>

                <div className="space-y-2">
                  <Label>Radio Buttons</Label>
                  <Radio name="opcion" label="Opción 1" value="1" />
                  <Radio name="opcion" label="Opción 2" value="2" />
                </div>

                <div className="space-y-2">
                  <Label>Switches</Label>
                  <Switch label="Activar notificaciones" />
                  <Switch label="Modo oscuro" />
                </div>

                <Select
                  label="Selecciona una opción"
                  options={[
                    { value: "1", label: "Opción 1" },
                    { value: "2", label: "Opción 2" },
                    { value: "3", label: "Opción 3", disabled: true },
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
                <CardTitle>Card Básica</CardTitle>
                <CardDescription>Una card simple con header y contenido</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Este es el contenido principal de la card.</p>
              </CardContent>
            </Card>

            <Card variant="primary" hover={true}>
              <CardHeader>
                <CardTitle>Card con Hover</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Esta card tiene efecto hover. Pasa el cursor por encima para verlo.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Acción</Button>
              </CardFooter>
            </Card>

            
          </div>
        </section>

        {/* Alertas y Feedback */}
        <section id="alertas" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Alertas y Feedback</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Alert variant="info" title="Información" onClose={() => {}}>
                  Esta es una alerta informativa.
                </Alert>

                <Alert variant="success" title="Éxito">
                  Tus cambios han sido guardados correctamente.
                </Alert>
              </div>

              <div className="space-y-4">
                <Alert variant="warning" title="Advertencia">
                  Por favor revisa tu información antes de continuar.
                </Alert>

                <Alert variant="error" title="Error">
                  Ha ocurrido un error al procesar tu solicitud.
                </Alert>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Barras de Progreso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar value={25} showLabel />
                <ProgressBar value={50} variant="success" showLabel />
                <ProgressBar value={75} variant="warning" showLabel />
                <ProgressBar value={100} variant="error" showLabel />
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-4 justify-center">
              {/* Aseguramos que cada Tooltip tenga un children válido */}
              <Tooltip content="Este es un tooltip" position="top">
                <Button>Hover (Arriba)</Button>
              </Tooltip>

              <Tooltip content="Tooltip a la derecha" position="right">
                <Button variant="secondary">Hover (Derecha)</Button>
              </Tooltip>

              <Tooltip content="Tooltip abajo" position="bottom">
                <Button variant="destructive">Hover (Abajo)</Button>
              </Tooltip>

              <Tooltip content="Tooltip a la izquierda" position="left">
                <Button variant="ghost">Hover (Izquierda)</Button>
              </Tooltip>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => setShowToast(true)} variant="primary">
                Mostrar Toast
              </Button>

              {showToast && (
                <Toast variant="success" title="¡Operación Exitosa!" visible={true} onClose={() => setShowToast(false)}>
                  Esta es una notificación toast que desaparecerá automáticamente.
                </Toast>
              )}
            </div>
          </div>
        </section>

        {/* Navegación */}
        <section id="navegacion" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Componentes de Navegación</h2>
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

        {/* Steps y Timeline */}
        <section id="steps-timeline" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Steps y Timeline</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Steps / Wizard</CardTitle>
              </CardHeader>
              <CardContent>
                <Steps steps={stepsItems} currentStep={currentStep} />
                <div className="mt-6 flex justify-between">
                  <Button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
                    Anterior
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(Math.min(stepsItems.length - 1, currentStep + 1))}
                  >
                    {currentStep === stepsItems.length - 1 ? "Finalizar" : "Siguiente"}
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

        {/* Fecha y Calendario */}
        <section id="fecha-calendario" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Componentes de Fecha</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendario</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar value={selectedDate} onChange={setSelectedDate} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date Picker</CardTitle>
              </CardHeader>
              <CardContent>
                <DatePicker label="Selecciona una fecha" value={selectedDate} onChange={setSelectedDate} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tabla de Datos */}
        <section id="tabla-datos" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Tabla de Datos</h2>
          <Card>
            <CardHeader>
              <CardTitle>Tabla de Usuarios</CardTitle>
              <CardDescription>Ejemplo de tabla de datos con paginación</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={tableColumns} data={tableData} keyField="id" pageSize={2} />
            </CardContent>
          </Card>
        </section>

        {/* Diálogos y Drawers */}
        <section id="dialogos-drawers" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Diálogos y Drawers</h2>
          <Card>
            <CardHeader>
              <CardTitle>Componentes Modales</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => setIsDialogOpen(true)}>Abrir Diálogo</Button>
              <Button onClick={() => setIsDrawerOpen(true)} variant="secondary">
                Abrir Drawer
              </Button>

              <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="Título del Diálogo"
                description="Esta es una descripción del contenido del diálogo."
                footer={
                  <>
                    <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Confirmar</Button>
                  </>
                }
              >
                <p>Este es el contenido principal del diálogo.</p>
              </Dialog>

              <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Título del Drawer">
                <div className="space-y-4">
                  <p>Este es el contenido del drawer lateral.</p>
                  <Button onClick={() => setIsDrawerOpen(false)}>Cerrar</Button>
                </div>
              </Drawer>
            </CardContent>
          </Card>
        </section>

        {/* Collapsible */}
        <section id="collapsible" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Collapsible</h2>
          <Collapsible title="Haz clic para expandir/colapsar" defaultOpen={true}>
            <div className="p-4">
              <p>Este es el contenido colapsable que puede ser expandido o contraído.</p>
              <p className="mt-2">Puedes incluir cualquier tipo de contenido aquí, incluyendo otros componentes.</p>
            </div>
          </Collapsible>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gradient-y2k-silver text-center">
        <p className="text-gray-700 font-bold">Y2K UI Library © 2023</p>
        <p className="text-gray-600 mt-2">Una librería de componentes React con estética retro-futurista</p>
      </footer>
    </div>
  )
}

