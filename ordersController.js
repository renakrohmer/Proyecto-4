let orders = [
    {
        id: 12,
        name: 'Habitacion doble standard',
        hotel: 'Barcelo Punta Cana',
        date: '2025-01-25',
        status: 'Enviado',
        price: 200,
        quantity: 1,
        total: 200,
    },
    {
        id: 22,
        name: 'Habitacion doble premium',
        hotel: 'Barcelo Punta Cana',
        date: '2025-01-13',
        status: 'Enviado',
        price: 300,
        quantity: 1,
        total: 300,
    },
    {
        id: 32,
        name: 'Habitacion doble',
        hotel: 'Riviera Punta Cana',
        date: '2025-01-03',
        status: 'Enviado',
        price: 250,
        quantity: 2,
        total: 500, 
    },
    {
        id: 42,
        name: 'Habitacion triple',
        hotel: 'Riviera Punta Cana',
        date: '2025-01-11',
        status: 'Enviado',
        price: 340,
        quantity: 2,
        total: 680,   
    },
    {
        id: 52,
        name: 'Habitacion doble vista interior',
        hotel: 'Riu Punta Cana',
        date: '2025-01-10',
        status: 'Enviado',
        price: 310,
        quantity: 3,
        total: 930,  
    },
    {
        id: 62,
        name: 'Habitacion doble vista exterior',
        hotel: 'Riu Punta Cana',
        date: '2025-01-09',
        status: 'Enviado',
        price: 400,
        quantity: 1,
        total: 400,  
    },
    {
        id: 72,
        name: 'Habitacion triple vista exterior',
        hotel: 'Riu Punta Cana',
        date: '2025-01-03',
        status: 'Enviado',
        price: 530,
        quantity: 2,
        total: 1000,  
    },
    {
        id: 82,
        name: 'Habitacion triple vista interior',
        hotel: 'Riu Punta Cana',
        date: '2025-01-06',
        status: 'Enviado',
        price: 490,
        quantity: 1,
        total: 490,  
    },
    {
        id: 92,
        name: 'Habitacion doble standard',
        hotel: 'Hard Rock Punta Cana',
        date: '2025-01-13',
        status: 'Enviado',
        price: 300,
        quantity: 4,
        total: 1200,  
    }
]


exports.create = async (req, res) => {
    const newOrder = req.body
    newOrder.id = orders.length + 1
    orders.push(newOrder)

    res.status(201).json({
        msg: 'Habitacion reservada con éxito.',
        data: newOrder,
    })
}


exports.readAll = async (req, res) => {
    res.json({
        msg: 'Lista de reservas entregada con éxito.',
        data: orders,
    })
}


exports.readOne = async (req, res) => {
    const orderId = parseInt(req.params.id)
    const order = orders.find((o) => o.id === orderId)

    if (!order) {
        return res.status(404).json({ msg: 'Reserva no encontrada.' })
    }

    res.json({
        msg: 'Reserva realizada con éxito.',
        data: order,
    })
}


exports.update = async (req, res) => {
    const orderId = parseInt(req.params.id)
    const orderIndex = orders.findIndex((o) => o.id === orderId)

    if (orderIndex === -1) {
        return res.status(404).json({ msg: 'Reserva no encontrada.' })
    }

    orders[orderIndex] = { ...orders[orderIndex], ...req.body }
    res.json({
        msg: 'Reserva actualizada con éxito.',
        data: orders[orderIndex],
    })
}


exports.delete = async (req, res) => {
    const orderId = parseInt(req.params.id)
    const orderIndex = orders.findIndex((o) => o.id === orderId)

    if (orderIndex === -1) {
        return res.status(404).json({ msg: 'Reserva no encontrada.' })
    }

    orders.splice(orderIndex, 1)
    res.json({ msg: 'Pedido eliminado con éxito.' })
}

// f-j. F
exports.filter = async (req, res) => {
    const { name, hotel, date, status } = req.query

    const filteredOrders = orders.filter((order) => {
        if (name && order.name !== name) {
            return false
        }
        if (hotel && order.hotel !== hotel) {
            return false
        }
        if (date && order.date !== date) {
            return false
        }
        if (status && order.status !== status) {
            return false
        }
        return true
    })

    if (filteredOrders.length === 0) {
        return res.status(404).json({ msg: 'Reserva no encontrada.' })
    }

    res.json({
        msg: 'Reservas filtradas con éxito.',
        data: filteredOrders,
    })
}
