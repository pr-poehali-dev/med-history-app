import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  diagnosis: string;
  status: 'stable' | 'attention' | 'critical';
}

interface Reminder {
  id: string;
  patientName: string;
  type: 'appointment' | 'medication' | 'test';
  time: string;
  description: string;
}

interface MedicalHistory {
  date: string;
  type: string;
  description: string;
  doctor: string;
}

interface Heredity {
  relative: string;
  condition: string;
  severity: 'low' | 'medium' | 'high';
}

function Index() {
  const [activeTab, setActiveTab] = useState('patients');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const patients: Patient[] = [
    { id: '1', name: 'Иванов Петр Сергеевич', age: 45, gender: 'М', lastVisit: '20.11.2024', diagnosis: 'Гипертония', status: 'stable' },
    { id: '2', name: 'Смирнова Анна Ивановна', age: 32, gender: 'Ж', lastVisit: '22.11.2024', diagnosis: 'Диабет 2 типа', status: 'attention' },
    { id: '3', name: 'Козлов Михаил Петрович', age: 58, gender: 'М', lastVisit: '23.11.2024', diagnosis: 'ИБС', status: 'critical' },
    { id: '4', name: 'Новикова Елена Александровна', age: 28, gender: 'Ж', lastVisit: '21.11.2024', diagnosis: 'Анемия', status: 'stable' },
  ];

  const reminders: Reminder[] = [
    { id: '1', patientName: 'Иванов П.С.', type: 'appointment', time: '14:00', description: 'Контрольный осмотр' },
    { id: '2', patientName: 'Смирнова А.И.', type: 'medication', time: '15:30', description: 'Напомнить об инсулине перед обедом' },
    { id: '3', patientName: 'Козлов М.П.', type: 'test', time: '16:00', description: 'Результаты ЭКГ готовы' },
    { id: '4', patientName: 'Новикова Е.А.', type: 'appointment', time: '17:00', description: 'Консультация по анализам' },
  ];

  const schedule = [
    { time: '09:00', status: 'free' },
    { time: '10:00', status: 'busy', patient: 'Васильев И.И.' },
    { time: '11:00', status: 'free' },
    { time: '12:00', status: 'busy', patient: 'Петрова М.А.' },
    { time: '13:00', status: 'lunch' },
    { time: '14:00', status: 'busy', patient: 'Иванов П.С.' },
    { time: '15:00', status: 'free' },
    { time: '16:00', status: 'free' },
    { time: '17:00', status: 'busy', patient: 'Новикова Е.А.' },
  ];

  const medicalHistory: MedicalHistory[] = [
    { date: '20.11.2024', type: 'Осмотр', description: 'Артериальное давление 140/90. Назначен Эналаприл 10мг', doctor: 'Др. Соколова' },
    { date: '15.10.2024', type: 'Анализы', description: 'ОАК: Hb 135 г/л, Лейкоциты 6.2', doctor: 'Др. Соколова' },
    { date: '01.09.2024', type: 'Консультация', description: 'Жалобы на головные боли. ЭКГ без патологии', doctor: 'Др. Соколова' },
  ];

  const heredity: Heredity[] = [
    { relative: 'Отец', condition: 'Инфаркт миокарда (62 года)', severity: 'high' },
    { relative: 'Мать', condition: 'Гипертоническая болезнь', severity: 'medium' },
    { relative: 'Дедушка (по отцу)', condition: 'Сахарный диабет 2 типа', severity: 'medium' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-500';
      case 'attention': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'appointment': return 'Calendar';
      case 'medication': return 'Pill';
      case 'test': return 'FlaskConical';
      default: return 'Bell';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="flex h-screen bg-medical-bg">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Activity" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">MediCare</h1>
              <p className="text-xs text-gray-500">Врачебная система</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={activeTab === 'patients' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('patients')}
          >
            <Icon name="Users" className="mr-2" size={18} />
            Пациенты
          </Button>
          <Button
            variant={activeTab === 'reminders' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('reminders')}
          >
            <Icon name="Bell" className="mr-2" size={18} />
            Напоминания
          </Button>
          <Button
            variant={activeTab === 'schedule' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('schedule')}
          >
            <Icon name="Calendar" className="mr-2" size={18} />
            Расписание
          </Button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary text-white">ДС</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Др. Соколова</p>
              <p className="text-xs text-gray-500">Терапевт</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden">
        {activeTab === 'patients' && (
          <div className="h-full flex">
            <div className="w-2/5 border-r border-gray-200 bg-white">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold mb-2">Пациенты</h2>
                <p className="text-gray-500">Всего активных: {patients.length}</p>
              </div>
              <ScrollArea className="h-[calc(100vh-140px)]">
                <div className="p-4 space-y-3">
                  {patients.map((patient) => (
                    <Card
                      key={patient.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedPatient?.id === patient.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base mb-1">{patient.name}</CardTitle>
                            <CardDescription className="text-xs">
                              {patient.age} лет, {patient.gender}
                            </CardDescription>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(patient.status)}`} />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-700">{patient.diagnosis}</p>
                          <p className="text-xs text-gray-500">Последний визит: {patient.lastVisit}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="flex-1 bg-gray-50">
              {selectedPatient ? (
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-3xl font-bold mb-1">{selectedPatient.name}</h2>
                          <p className="text-gray-500">ID: {selectedPatient.id} • {selectedPatient.age} лет • {selectedPatient.gender}</p>
                        </div>
                        <Badge variant="outline" className="h-fit">
                          {selectedPatient.diagnosis}
                        </Badge>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon name="Dna" size={20} />
                          Наследственная предрасположенность
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {heredity.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.relative}</p>
                              <p className="text-sm text-gray-600">{item.condition}</p>
                            </div>
                            <Badge variant={getSeverityColor(item.severity)}>
                              {item.severity === 'high' ? 'Высокий риск' : item.severity === 'medium' ? 'Средний' : 'Низкий'}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon name="FileText" size={20} />
                          История болезни
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {medicalHistory.map((record, index) => (
                            <div key={index} className="relative pl-6 pb-4 border-l-2 border-primary last:border-l-0 last:pb-0">
                              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white" />
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">{record.type}</Badge>
                                  <span className="text-xs text-gray-500">{record.date}</span>
                                </div>
                                <p className="text-sm text-gray-700">{record.description}</p>
                                <p className="text-xs text-gray-500">{record.doctor}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon name="Activity" size={20} />
                          Текущее состояние
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <Icon name="Heart" className="mx-auto mb-2 text-blue-600" size={24} />
                            <p className="text-2xl font-bold text-blue-600">140/90</p>
                            <p className="text-xs text-gray-600">Давление</p>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <Icon name="Thermometer" className="mx-auto mb-2 text-green-600" size={24} />
                            <p className="text-2xl font-bold text-green-600">36.6°</p>
                            <p className="text-xs text-gray-600">Температура</p>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <Icon name="Activity" className="mx-auto mb-2 text-purple-600" size={24} />
                            <p className="text-2xl font-bold text-purple-600">72</p>
                            <p className="text-xs text-gray-600">Пульс</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Icon name="UserSearch" className="mx-auto mb-4" size={64} />
                    <p className="text-lg">Выберите пациента для просмотра</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="p-6 h-full overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Напоминания</h2>
                <p className="text-gray-500">Сегодня, 24 ноября 2024</p>
              </div>

              <div className="grid gap-4">
                {reminders.map((reminder) => (
                  <Card key={reminder.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          reminder.type === 'appointment' ? 'bg-blue-100' :
                          reminder.type === 'medication' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          <Icon
                            name={getReminderIcon(reminder.type)}
                            size={24}
                            className={
                              reminder.type === 'appointment' ? 'text-blue-600' :
                              reminder.type === 'medication' ? 'text-green-600' : 'text-purple-600'
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{reminder.patientName}</h3>
                            <Badge variant="outline" className="text-xs">
                              {reminder.time}
                            </Badge>
                          </div>
                          <p className="text-gray-700">{reminder.description}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Icon name="Check" size={20} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="p-6 h-full overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Расписание</h2>
                <p className="text-gray-500">Ваши записи на сегодня</p>
              </div>

              <div className="grid gap-3">
                {schedule.map((slot, index) => (
                  <Card
                    key={index}
                    className={`transition-all ${
                      slot.status === 'free' ? 'bg-green-50 hover:bg-green-100 cursor-pointer' :
                      slot.status === 'busy' ? 'bg-blue-50' :
                      'bg-gray-100'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-gray-700 w-20">
                            {slot.time}
                          </div>
                          {slot.status === 'free' && (
                            <div className="flex items-center gap-2 text-green-700">
                              <Icon name="CheckCircle" size={20} />
                              <span className="font-medium">Свободное окно</span>
                            </div>
                          )}
                          {slot.status === 'busy' && (
                            <div className="flex items-center gap-2">
                              <Icon name="UserCheck" size={20} className="text-blue-600" />
                              <span className="font-medium">{slot.patient}</span>
                            </div>
                          )}
                          {slot.status === 'lunch' && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Icon name="Coffee" size={20} />
                              <span className="font-medium">Обед</span>
                            </div>
                          )}
                        </div>
                        {slot.status === 'free' && (
                          <Button size="sm">
                            <Icon name="Plus" className="mr-2" size={16} />
                            Записать
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Index;
