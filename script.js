    let jegyek = JSON.parse(localStorage.getItem("jegyek")) ?? [];


    const addJegy = (state, ujJegy) => {
      return [...state, ujJegy];
    };

    const deleteJegy = (state, index) => {
      return state.filter((_, i) => i !== index);
    };

    const atlagSzamitas = (state) => {
      if (state.length === 0) return "0.00";
      const osszeg = state.reduce((sum, j) => sum + j.jegy, 0);
      return (osszeg / state.length).toFixed(2);
    };

    const tantargyAtlag = (state) => {
      const csoport = state.reduce((acc, j) => {
        acc[j.tantargy] = acc[j.tantargy]
          ? [...acc[j.tantargy], j.jegy]
          : [j.jegy];
        return acc;
      }, {});

      return Object.entries(csoport).map(([tantargy, jegyek]) => ({
        tantargy,
        atlag: (
          jegyek.reduce((a, b) => a + b, 0) / jegyek.length
        ).toFixed(2)
      }));
    };


    const renderJegyek = () => {
      const tbody = document.getElementById("jegyek");
      tbody.innerHTML = "";

      jegyek.forEach((j, index) => {
        tbody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${j.tantargy}</td>
            <td>${j.jegy}</td>
            <td>${j.datum}</td>
            <td>
              <button class="torles" onclick="handleDelete(${index})">Törlés</button>
            </td>
          </tr>
        `;
      });

      document.getElementById("atlag").textContent =
        atlagSzamitas(jegyek);
    };

    const renderTantargyAtlag = () => {
      const tbody = document.getElementById("tantargy-atlag");
      tbody.innerHTML = "";

      tantargyAtlag(jegyek).forEach(t => {
        tbody.innerHTML += `
          <tr>
            <td>${t.tantargy}</td>
            <td>${t.atlag}</td>
          </tr>
        `;
      });
    };


    document.getElementById("hozzaadas").addEventListener("click", () => {
      const tantargy = document.getElementById("tantargy").value;
      const jegy = Number(
        document.querySelector(".jegy.active").dataset.value
      );

      const ujJegy = {
        tantargy,
        jegy,
        datum: new Date().toISOString().split("T")[0]
      };

      jegyek = addJegy(jegyek, ujJegy);
      localStorage.setItem("jegyek", JSON.stringify(jegyek));

      renderJegyek();
      renderTantargyAtlag();
    });

    const handleDelete = (index) => {
      jegyek = deleteJegy(jegyek, index);
      localStorage.setItem("jegyek", JSON.stringify(jegyek));

      renderJegyek();
      renderTantargyAtlag();
    };

    document.querySelectorAll(".jegy").forEach(btn => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".jegy")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
      });
    });


    renderJegyek();
    renderTantargyAtlag();

    const gradeButtons = document.querySelectorAll(".grade-buttons button");

    gradeButtons.forEach(button => {
        button.addEventListener("click", () => {

            gradeButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");
        });
    });