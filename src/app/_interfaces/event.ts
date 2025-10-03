export interface EventJO {
    id: number,
    date_event: Date,
    sport: Sport,
    location: Location


}

export interface Sport {
    id: number,
    name: string
}

export interface Location {
    id: number,
    name: string,
    nb_places: number
}
