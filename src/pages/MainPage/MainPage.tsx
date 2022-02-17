import React, { FC } from 'react';
import Footer from '../../components/Footer';

import styles from './MainPage.module.scss';

const MainPage: FC = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.logoWrapper}>
        <img width="279" height="219" src="/assets/img/logo.png" alt="English Academy logo" />
      </div>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>
          English Academy – приложение для изучения иностранных слов, включающее электронный учебник с базой слов для
          изучения, мини-игры для их повторения, страницу статистики для отслеживания индивидуального прогресса.
        </p>
      </div>
      <div className={styles.descrWrapper}>
        <h2 className={styles.descrTitle}>Особенности приложения</h2>
        <div className={styles.descrItem}>
          <div className={styles.imgWrapper}>
            <img src="/assets/img/descr01.jpg" alt="Учебник" />
          </div>
          <div className={styles.descrBody}>
            <h3 className={styles.descrSubtitle}>Учебник</h3>
            <p className={styles.descrMore}>
              Приложение содержит базу наиболее употребимых английских слов в количестве 3600 слов.
            </p>
            <p className={styles.descrMore}>
              Карточка слова, помимо непосредственно перевода, дополнена предложением с объяснением значения слова и его
              переводом, предложением с примером использования изучаемого слова и его переводом, ассоциативной картинкой
              к изучаемому слову, а также кнопкой аудио.
            </p>
            <p className={styles.descrMore}>
              Каждую карточку слова можно отметить как сложную, либо как изученную. Сложные слова группируются на
              специальной странице.
            </p>
          </div>
        </div>
        <div className={styles.descrItem}>
          <div className={styles.imgWrapper}>
            <img src="/assets/img/descr02.jpg" alt="Мини-игры" />
          </div>
          <div className={styles.descrBody}>
            <h3 className={styles.descrSubtitle}>Мини-игры</h3>
            <p className={styles.descrMore}>
              В приложении есть 2 мини-игры для закрепления изучаемых слов - <em>Аудиовызов</em> и <em>Спринт</em>.
            </p>
            <p className={styles.descrMore}>
              Аудиовызов - игра, в которой Вам необходимо прослушать слово и нажать соответствющую этому слову кнопку
            </p>
            <p className={styles.descrMore}>
              В игре Спринт представлена карточка слова с его переводом, Вам необходимо ответить за определенное время
              правильно ли составлены предложенные карточки.
            </p>
            <p className={styles.descrMore}>Управлять играми можно как мышкой, так и клавишами на клавиатуре</p>
          </div>
        </div>
        <div className={styles.descrItem}>
          <div className={styles.imgWrapper}>
            <img src="/assets/img/descr03.jpg" alt="Статистика" />
          </div>
          <div className={styles.descrBody}>
            <h3 className={styles.descrSubtitle}>Статистика</h3>
            <p className={styles.descrMore}>
              На странице статистики отображается краткосрочная статистика по мини-играм и по словам за каждый день
              изучения.
            </p>
            <p className={styles.descrMore}>
              В статистике можно отслеживать прогресс изучения по таким метрикам, как количество новых слов за день,
              процент правильных ответов в играх, самая длинная серия правильных ответов и некоторым другим.
            </p>
            <p className={styles.descrMore}>
              Кроме того, представлены 2 графика, отображающих количество новых слов за каждый день изучения и
              увеличение общего количества изученных слов за весь период обучения по дням.
            </p>
          </div>
        </div>
      </div>
      <h2 className={styles.aboutTitle}>О команде</h2>
      <div className={styles.aboutWrapper}>
        <div className={styles.aboutItem}>
          <div className={styles.aboutImage}>
            <img style={{ borderRadius: 10 }} src="/assets/img/command01.jpg" alt="" />
          </div>
          <div className={styles.aboutBody}>
            <h3 className={styles.aboutSubtitle}>Dmitry Kolesnichenko</h3>
            <p className={styles.aboutMore}>
              Разработал базовую структуру и каркас приложения, раздел учебника, главную страницу, графики в разделе
              статистики
            </p>
            <div className={styles.linkWrapper}>
              <a className={styles.githubLink} href="https://www.github.com/webdev163" target="__blank">
                <img className={styles.githubImg} src="/assets/img/github-logo.svg" alt="" />
                <span className={styles.githubName}>webdev163</span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.aboutItem}>
          <div className={styles.aboutImage}>
            <img style={{ borderRadius: 10 }} src="/assets/img/command02.png" alt="" />
          </div>
          <div className={styles.aboutBody}>
            <h3 className={styles.aboutSubtitle}>Alisa Kuzmenko</h3>
            <p className={styles.aboutMore}>
              Разработала страницу статистики, блок регистрации и авторизации, взаимодействие с сервером, настроила
              сервер
            </p>
            <div className={styles.linkWrapper}>
              <a className={styles.githubLink} href="https://www.github.com/komalapa" target="__blank">
                <img className={styles.githubImg} src="/assets/img/github-logo.svg" alt="" />
                <span className={styles.githubName}>komalapa</span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.aboutItem}>
          <div className={styles.aboutImage}>
            <img style={{ borderRadius: 10 }} src="/assets/img/command03.jpg" alt="" />
          </div>
          <div className={styles.aboutBody}>
            <h3 className={styles.aboutSubtitle}>Konstantin Lemko</h3>
            <p className={styles.aboutMore}>
              Разработал мини-игры &quot;Аудиовызов&quot; и &quot;Спринт&quot;, взаимодействие мини-игр с другими
              блоками сайта
            </p>
            <div className={styles.linkWrapper}>
              <a className={styles.githubLink} href="https://www.github.com/kolem1" target="__blank">
                <img className={styles.githubImg} src="/assets/img/github-logo.svg" alt="" />
                <span className={styles.githubName}>kolem1</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
