import { useState } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BellRing, AlertTriangle } from "lucide-react";

const TemperatureThresholdModal = ({ selectedCity }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        temperatureLimit: '',
        direction: 'above'
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/add-user', {
                ...formData,
                city: selectedCity
            });

            setStatus({
                type: 'success',
                message: 'Temperature threshold alert has been set successfully!'
            });

            // Reset form and close modal after short delay
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    temperatureLimit: '',
                    direction: 'above'
                });
                setStatus({ type: '', message: '' });
                setOpen(false);
            }, 1500);

        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to set temperature threshold'
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDirectionChange = (value) => {
        setFormData(prev => ({
            ...prev,
            direction: value
        }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-blue-600 hover:bg-blue-700 text-white border-none"
                >
                    <BellRing className="w-4 h-4 mr-2" />
                    Set Temperature Alert
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2 text-blue-100">
                        <BellRing className="w-5 h-5" />
                        <span>Temperature Alert Settings</span>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Name</label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-slate-800 border-slate-700 text-slate-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-slate-800 border-slate-700 text-slate-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Temperature Threshold (°C)</label>
                        <Input
                            type="number"
                            name="temperatureLimit"
                            value={formData.temperatureLimit}
                            onChange={handleChange}
                            className="bg-slate-800 border-slate-700 text-slate-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Alert Direction</label>
                        <Select
                            value={formData.direction}
                            onValueChange={handleDirectionChange}
                        >
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-800">
                                <SelectItem value="above" className="text-slate-100">Above Threshold</SelectItem>
                                <SelectItem value="below" className="text-slate-100">Below Threshold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {status.message && (
                        <Alert className={`${status.type === 'success' ? 'bg-green-900/50' : 'bg-red-900/50'
                            } border-none`}>
                            <AlertTriangle className={`${status.type === 'success' ? 'text-green-400' : 'text-red-400'
                                } h-4 w-4`} />
                            <AlertDescription className="text-slate-100">
                                {status.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Set Alert
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TemperatureThresholdModal;