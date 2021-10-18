import { Request, Response, Router } from 'express';
import { readJsonConfigFile } from 'typescript';
import Employee from '../models/cidenetModel';
import moment from 'moment';

let controller = {
    home: (req:Request, res:Response) => {
        return res.send('Hola soy Home');
    },
    getEmployees: async (req:Request, res:Response) => {
        const allEmployees = await Employee.find();
        return res.json(allEmployees); 
    },
    createEmployee: async (req:Request, res:Response) => {
        let {form, correo} = req.body;
        let { apellido1, apellido2, nombre1, otroNombre, pais, 
            tipo_identificacion, nro_identificacion, ingreso, area, estado, registro } = form;
        
        let ingresoDate = ingreso;
        ingreso = moment(ingreso).format('DD/MM/YYYY HH:mm');
        
        const createEmployee = await new Employee({
            apellido1,
            apellido2,
            nombre1,
            otroNombre,
            pais,
            tipo_identificacion,
            nro_identificacion,
            correo,
            ingreso,
            area,
            estado,
            registro,
            ingresoDate
        })
        
        createEmployee.save((err:any, employee:any) => {
            if(err) return res.status(500).send({message: 'Error al crear empleado'});
            if(!employee) return res.status(404).send({message: 'No se ha podido crear el empleado'});

            return res.status(200).json(employee);
        })      
    },
    deleteAllEmployees: async (req:Request, res:Response) => {
        const allEmployees = await Employee.deleteMany();
        return res.json(allEmployees);
    },
    searchEmployee: async (req:Request, res:Response) => {
        let { tipo_identificacion, nro_identificacion } = req.body;
        
        const employee = await Employee.findOne({tipo_identificacion, nro_identificacion});
        
        return res.json(employee);
    },
    deleteEmployee: async (req:Request, res:Response) => {
        let deleteEmployee = await Employee.deleteMany({correo:req.body.params.correo});
        let allEmployees = await Employee.find();
        
        return res.json(allEmployees);
    },
    editEmployee: async (req:Request, res:Response) => {
        let {form, correo} = req.body;
        let { apellido1, apellido2, nombre1, otroNombre, pais, 
            tipo_identificacion, nro_identificacion, ingreso, area, estado, registro, edicion } = form;
        
        let ingresoDate = ingreso;
        ingreso = moment(ingreso).format('DD/MM/YYYY HH:mm');
        
        const employee = await Employee.findOne({tipo_identificacion, nro_identificacion});

        employee.apellido1 = apellido1;
        employee.apellido2 = apellido2;
        employee.nombre1 = nombre1;
        employee.otroNombre = otroNombre;
        employee.pais = pais;
        employee.tipo_identificacion = tipo_identificacion;
        employee.nro_identificacion = nro_identificacion;
        employee.correo = correo;
        employee.ingreso = ingreso;
        employee.area = area;
        employee.estado = estado
        employee.edicion = edicion;
        
        let editEmployee = await employee.save();

        const allEmployees = await Employee.find();
        return res.send(allEmployees);
        
        // createEmployee.save((err:any, employee:any) => {
        //     if(err) return res.status(500).send({message: 'Error al crear empleado'});
        //     if(!employee) return res.status(404).send({message: 'No se ha podido crear el empleado'});

        //     return res.status(200).json(employee);
        // })      
    }
}

export default controller;