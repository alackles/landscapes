$.getScript("./landscape.js", function()
    {;
        landscape_file = "../../data/coords_CF4.csv";
        lod_file = "../../data/reps/SEED_00__F_CF4__MUT_0001__T_04/lod.csv";
        edges_file = "../../data/reps/SEED_00__F_CF4__MUT_0001__T_04/edges.csv";
        load_landscape(landscape_file, lod_file, edges_file);
    }

)


