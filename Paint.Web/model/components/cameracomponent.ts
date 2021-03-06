﻿/// <reference path="../core/component.ts" />

class CameraComponent extends Component {
    positionComponent: PositionComponent;
    horizontalTime: number = 0;
    verticalTime: number = 0;
    horizontalDirection: number = 0;
    verticalDirection: number = 0;

    constructor(positionComponent: PositionComponent) {
        super();

        this.positionComponent = positionComponent;
    }
}