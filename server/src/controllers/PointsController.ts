import { Request, Response } from 'express';
import knex from '../database/connection';


class PointsController {
    async create(req: Request, resp: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;
        console.log(latitude, longitude);
        const trx = await knex.transaction();
        const point = {
            image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
        const insertdIds = await trx('points').insert(point);

        const point_id = insertdIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        })

        await trx('point_items').insert(pointItems);

        await trx.commit();
        return resp.json({ id: point_id, ...point });
    }
    async index(req: Request, resp: Response) {
        const teste = JSON.stringify(req.query);
        let points: any[] = [];
        if (teste !== '{}') {
            if (teste.includes('city')) {
                const { city } = req.query;
                points = await knex('points').withSchema('teste')
                    .join('point_items', 'points.id', '=', 'point_items.point_id')
                    .where('city', String(city))
                    .distinct()
                    .select('points.*');
                if (teste.includes('uf')) {
                    const { uf } = req.query;
                    points = await knex('points').withSchema('teste')
                        .join('point_items', 'points.id', '=', 'point_items.point_id')
                        .where('city', String(city))
                        .where('uf', String(uf))
                        .distinct()
                        .select('points.*');
                    if (teste.includes('items')) {
                        const { items } = req.query;

                        const parsedItems = String(items)
                            .split(',').map(item =>
                                Number(item.trim())
                            )
                        points = await knex('points').withSchema('teste')
                            .join('point_items', 'points.id', '=', 'point_items.point_id')
                            .whereIn('point_items.item_id', parsedItems)
                            .where('city', String(city))
                            .where('uf', String(uf))
                            .distinct()
                            .select('points.*');

                        return resp.json(points);
                    }
                    return resp.json(points);
                } else if (teste.includes('items')) {
                    const { items } = req.query;

                    const parsedItems = String(items)
                        .split(',').map(item =>
                            Number(item.trim())
                        )
                    points = await knex('points').withSchema('teste')
                        .join('point_items', 'points.id', '=', 'point_items.point_id')
                        .whereIn('point_items.item_id', parsedItems)
                        .where('city', String(city))
                        .distinct()
                        .select('points.*');

                    return resp.json(points);
                }
                return resp.json(points);
            } else if (teste.includes('uf')) {
                const { uf } = req.query;
                points = await knex('points').withSchema('teste')
                    .join('point_items', 'points.id', '=', 'point_items.point_id')
                    .where('uf', String(uf))
                    .distinct()
                    .select('points.*');
                if (teste.includes('items')) {
                    const { items } = req.query;

                    const parsedItems = String(items)
                        .split(',').map(item =>
                            Number(item.trim())
                        )
                    points = await knex('points').withSchema('teste')
                        .join('point_items', 'points.id', '=', 'point_items.point_id')
                        .whereIn('point_items.item_id', parsedItems)
                        .where('uf', String(uf))
                        .distinct()
                        .select('points.*');

                    return resp.json(points);
                }
                return resp.json(points);
            } else if (teste.includes('items')) {
                const { items } = req.query;

                const parsedItems = String(items)
                    .split(',').map(item =>
                        Number(item.trim())
                    )
                points = await knex('points').withSchema('teste')
                    .join('point_items', 'points.id', '=', 'point_items.point_id')
                    .whereIn('point_items.item_id', parsedItems)
                    .distinct()
                    .select('points.*');

                return resp.json(points);
            }
        }
        return resp.json(await knex('points').withSchema('teste').select('points.*'));
    }
    async show(req: Request, resp: Response) {
        const { id } = req.params;

        const point = await knex('points').withSchema('teste').where('id', id).first();

        if (!point) {
            return resp.status(404).json({ message: 'Ponto não encontrado' });
        }

        const items = await knex('items').withSchema('teste')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
        return resp.json({ point, items })
    }
}
export default PointsController;
