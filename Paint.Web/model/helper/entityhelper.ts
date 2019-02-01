﻿class EntityHelper {
    public static Player: string = 'player';
    public static Camera: string = 'camera';
    public static TopText: string = 'toptext';

    public static CreatePlatform(x: number, y: number, width: number, height: number): Entity {
        var platform = new Entity();
        var positionComponent = new PositionComponent(x, y, width, height);
        platform.AddComponent(positionComponent);
        platform.AddComponent(new PlatformComponent(positionComponent));
        return platform;
    }

    public static CreateSolidPlatform(x: number, y: number, width: number, height: number): Entity {
        var platform = new Entity();
        var positionComponent = new PositionComponent(x, y, width, height);
        platform.AddComponent(positionComponent);
        platform.AddComponent(new SolidPlatformComponent(positionComponent));
        return platform;
    }

    public static CreateGameMap(width: number, height: number, gameAnimation: GameAnimation, renderLayer: RenderLayer): Entity {
        var gamemap = new Entity();
        var positionComponent = new PositionComponent(0, 0, width, height);
        gamemap.AddComponent(positionComponent);
        gamemap.AddComponent(new RenderableComponent(positionComponent, width, height, '', renderLayer, gameAnimation));
        return gamemap;
    }

    public static CreateCamera(): Entity {
        var camera = new Entity();
        var positionComponent = new PositionComponent();
        camera.AddComponent(positionComponent);
        camera.AddComponent(new CameraComponent(positionComponent));
        return camera;
    }

    public static CreateJumpPaint(x: number, y: number): Entity {
        var paint = new Entity();
        var positionComponent = new PositionComponent(x, y, 100, 5);
        paint.AddComponent(positionComponent);
        var renderableComponent = new RenderableComponent(positionComponent, 100, 5, '#0077ff', RenderLayer.ForegroundPlayer);
        paint.AddComponent(renderableComponent);
        var paintComponent = new PaintComponent(positionComponent, renderableComponent, PaintType.HighJump);
        paint.AddComponent(paintComponent);

        return paint;
    }

    public static CreatePlayerEntity(x: number, y: number): Entity {
        var player = new Entity("player");
        var inputComponent = new InputComponent()
        player.AddComponent(inputComponent);
        var positionComponent = new PositionComponent(x, y, 130, 120);
        player.AddComponent(positionComponent);
        var moveableComponent = new MoveableComponent(positionComponent);
        player.AddComponent(moveableComponent);
        var renderableComponent = new RenderableComponent(positionComponent, 130, 120, '', RenderLayer.Player, SpriteHelper.playerWalking, 100);
        player.AddComponent(renderableComponent);
        player.AddComponent(new PlayerComponent(positionComponent, moveableComponent, inputComponent, renderableComponent));

        return player;
    }

    public static CreateNpcEntity(x: number, y: number, width: number, height: number, interactionX: number, interactionY: number, interactionWidth: number, interactionHeight: number, name: string
        , interactionAction: (self: NPCComponent, option: number, initialInteraction: boolean) => void): Entity {
        var npc = new Entity();
        var positionComponent = new PositionComponent(x, y, width, height);
        npc.AddComponent(positionComponent);
        var npcComponent = new NPCComponent(positionComponent, new PositionComponent(interactionX, interactionY, interactionWidth, interactionHeight), name, interactionAction);
        npc.AddComponent(npcComponent);
        var renderableComponent = new RenderableComponent(positionComponent, 130, 195, '', RenderLayer.Player, SpriteHelper.npcwipAnimation);
        npc.AddComponent(renderableComponent);

        return npc;
    }

    public static CreateSpawnedEntity(x: number, y: number, width: number, height: number, spawnVelocity: Vector2d, spawnMinPosition: Vector2d, spawnMaxPosition: Vector2d): Entity {
        var spawnedEntity = new Entity();
        var positionComponent = new PositionComponent(x, y, width, height);
        spawnedEntity.AddComponent(positionComponent);
        var moveableComponent = new MoveableComponent(positionComponent);
        moveableComponent.velocity = spawnVelocity;
        spawnedEntity.AddComponent(moveableComponent);
        var spawnedComponent = new SpawnedComponent(positionComponent, moveableComponent, spawnMinPosition, spawnMaxPosition);
        spawnedEntity.AddComponent(spawnedComponent);
        var renderableComponent = new RenderableComponent(positionComponent, width, height, '#ff00ff', RenderLayer.Player);
        spawnedEntity.AddComponent(renderableComponent);

        return spawnedEntity;
    }

    public static CreateSpawningEntity(x: number, y: number, width: number, height: number, spawnLocation: Vector2d, spawnVelocity: Vector2d, spawnMinPosition: Vector2d, spawnMaxPosition: Vector2d, spawnTime: number): Entity {
        var spawningEntity = new Entity();
        var positionComponent = new PositionComponent(x, y, width, height);
        spawningEntity.AddComponent(positionComponent);
        var spawnComponent = new SpawnComponent(positionComponent, spawnLocation, spawnVelocity, spawnMinPosition, spawnMaxPosition, spawnTime);
        spawningEntity.AddComponent(spawnComponent);
        var renderableComponent = new RenderableComponent(positionComponent, width, height, '#00ffff', RenderLayer.Player);
        spawningEntity.AddComponent(renderableComponent);

        return spawningEntity;
    }

    public static CreateLevelTriggerEntity(x: number, y: number, width: number, height: number, newLevel: Level, playerX: number, playerY: number): Entity {
        var levelTrigger = new Entity();
        var positionComponent = new PositionComponent(x, y, width, height);
        levelTrigger.AddComponent(positionComponent);
        var levelTriggerComponent = new LevelTriggerComponent(positionComponent, playerX, playerY, newLevel);
        levelTrigger.AddComponent(levelTriggerComponent);

        return levelTrigger;
    }
}
