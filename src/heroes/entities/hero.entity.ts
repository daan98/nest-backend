import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Hero {

    @Prop({ required: true, unique: true })
    id               : string;

    @Prop({ required: true })
    superhero        : string;

    @Prop({ required: true })
    publisher        : string;

    @Prop({ required: true })
    alter_ego        : string;

    @Prop({ required: true })
    first_appearance : string;

    @Prop({ required: true })
    characters       : string;

    @Prop({ required: true })
    alter_img        : string;
}

export const HeroSchema = SchemaFactory.createForClass( Hero );
