import { IRoute } from "express";
import { IDefaultCardItem } from "./default-card-item";
import { IEvent } from "./event";

export type ListItem = IDefaultCardItem | IEvent | IRoute;
